import { Router } from "express";
import { z } from "zod";

const router = Router();

// Example: Get all accounts for a user
router.get("/", (req, res) => {
  // TODO: Replace with DB query
  res.json([
    { type: "Checking", balance: 5234.12, number: "****1234" },
    { type: "Savings", balance: 10234.56, number: "****5678" },
  ]);
});

// Example: Get account details
router.get("/:id", (req, res) => {
  // TODO: Replace with DB query
  res.json({ type: "Checking", balance: 5234.12, number: "****1234" });
});

export default router;
