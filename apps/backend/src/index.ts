import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
// import drizzle ORM setup in a separate file if needed
import { Pool } from "pg";
import { z } from "zod";


const app = express();
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
import accountsRouter from "./routes/accounts";
import transactionsRouter from "./routes/transactions";
import transferRouter from "./routes/transfer";
import payBillsRouter from "./routes/payBills";
import profileRouter from "./routes/profile";
import authRouter from "./routes/auth";

app.use("/api/accounts", accountsRouter);
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
