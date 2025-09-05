import { Router } from "express";

const router = Router();

// Example: Get recent transactions
router.get("/", (req, res) => {
  // TODO: Replace with DB query
  res.json([
    { date: "2025-09-01", desc: "Deposit", amount: 1000.0 },
    { date: "2025-08-28", desc: "ATM Withdrawal", amount: -200.0 },
    { date: "2025-08-25", desc: "Bill Pay - Utilities", amount: -120.5 },
  ]);
});

export default router;
