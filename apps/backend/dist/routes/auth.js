import { Router } from "express";
import { z } from "zod";
const router = Router();
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
router.post("/login", (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: "Invalid login data" });
    }
    // TODO: Implement authentication logic
    req.session.user = { email: result.data.email };
    res.json({ success: true });
});
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});
export default router;
