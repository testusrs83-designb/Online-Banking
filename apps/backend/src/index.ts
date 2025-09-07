import 'dotenv/config';
import express from "express";
import * as Sentry from "@sentry/node";
import { setupExpressErrorHandler } from "@sentry/node/build/types/integrations/tracing/express";
Sentry.init({ dsn: process.env.SENTRY_DSN });
import session from "express-session";
import pgSession from "connect-pg-simple";
// import drizzle ORM setup in a separate file if needed
import { Pool } from "pg";
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
app.use("/api/transactions", transactionsRouter);
app.use("/api/transfer", transferRouter);
app.use("/api/pay-bills", payBillsRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wells Fargo Clone API" });
});

setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
