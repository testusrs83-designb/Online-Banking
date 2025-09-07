import { Router } from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { db } from "../db";
import { users } from "../schema";
import nodemailer from "nodemailer";
import { eq } from "drizzle-orm";
import { z } from "zod";
const router = Router();
// Rate limiter for signup
const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many signup attempts, please try again later."
});
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
// Email verification token store (in-memory for demo, use DB in prod)
const emailTokens = new Map();
// Setup nodemailer (use real SMTP in prod)
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
router.post("/login", (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: "Invalid login data" });
    }
    db.select().from(users).where(eq(users.email, result.data.email)).then(async (userArr) => {
        const user = userArr[0];
        if (!user)
            return res.status(401).json({ error: "User not found" });
        if (!user.email_verified)
            return res.status(403).json({ error: "Email not verified" });
        const match = await bcrypt.compare(result.data.password, user.password_hash);
        if (!match)
            return res.status(401).json({ error: "Invalid password" });
        req.session.user = { email: user.email };
        res.json({ success: true });
    });
    // Signup route
    router.post("/signup", signupLimiter, async (req, res) => {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: "Invalid signup data" });
        }
        const { email, password } = result.data;
        const existing = await db.select().from(users).where(eq(users.email, email));
        if (existing.length > 0)
            return res.status(409).json({ error: "Email already registered" });
        const hash = await bcrypt.hash(password, 12);
        // Generate email verification token
        const token = Math.random().toString(36).substring(2);
        emailTokens.set(email, token);
        await db.insert(users).values({ email, password_hash: hash, email_verified: 0, kyc_status: "pending" });
        // Send verification email
        await transporter.sendMail({
            from: "noreply@bank.com",
            to: email,
            subject: "Verify your email",
            text: `Click to verify: https://yourbank.com/verify?email=${email}&token=${token}`
        });
        res.json({ success: true, message: "Signup successful, check your email to verify." });
    });
    // Email verification route
    router.get("/verify", async (req, res) => {
        const { email, token } = req.query;
        if (!email || !token)
            return res.status(400).json({ error: "Missing email or token" });
        const valid = emailTokens.get(email) === token;
        if (!valid)
            return res.status(400).json({ error: "Invalid token" });
        await db.update(users).set({ email_verified: 1 }).where(eq(users.email, email));
        emailTokens.delete(email);
        res.json({ success: true, message: "Email verified!" });
    });
});
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});
export default router;
