import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const DrizzleSession = pgSession(session);
app.use(session({
    store: new DrizzleSession({ pool }),
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to First City Credit Union API" });
});
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
