import 'dotenv/config';
import express from "express";
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_DSN });
import session from "express-session";
import pgSession from "connect-pg-simple";
// import drizzle ORM setup in a separate file if needed
// ...existing Pool import above...
import { z } from "zod";


const app = express();
// Sentry error handler will be set up after routes
const PORT = process.env.PORT || 4000;

app.use(express.json());

import { db } from "./db";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const DrizzleSession = pgSession(session);
app.use(
  session({
    store: new DrizzleSession({ pool }),
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// API routes
import accountsRouter from "./routes/accounts.js";
import transactionsRouter from "./routes/transactions.js";
import transferRouter from "./routes/transfer.js";
import payBillsRouter from "./routes/payBills.js";
import profileRouter from "./routes/profile.js";
import authRouter from "./routes/auth.js";

app.use("/api/accounts", accountsRouter);

// DB schema verification route
import { Pool } from "pg";
app.get("/api/db-schema", async (req, res) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  try {
    const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    res.json({ tables: result.rows.map(r => r.table_name) });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  } finally {
    await pool.end();
  }
});
app.use("/api/transactions", transactionsRouter);
app.use("/api/transfer", transferRouter);
app.use("/api/pay-bills", payBillsRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wells Fargo Clone API" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
