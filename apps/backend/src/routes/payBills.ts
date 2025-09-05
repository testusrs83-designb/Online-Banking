import { Router } from "express";
import { z } from "zod";

const router = Router();

const billSchema = z.object({
  payee: z.string(),
  amount: z.number().positive(),
  date: z.string(),
});

router.post("/", (req, res) => {
  const result = billSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid bill data" });
  }
  // TODO: Implement bill pay logic
  res.json({ success: true });
});

export default router;
