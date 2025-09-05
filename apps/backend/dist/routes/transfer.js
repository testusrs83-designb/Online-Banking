import { Router } from "express";
import { z } from "zod";
const router = Router();
const transferSchema = z.object({
    from: z.string(),
    to: z.string(),
    amount: z.number().positive(),
});
router.post("/", (req, res) => {
    const result = transferSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: "Invalid transfer data" });
    }
    // TODO: Implement transfer logic
    res.json({ success: true });
});
export default router;
