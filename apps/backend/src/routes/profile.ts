import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // TODO: Replace with DB query
  res.json({ name: "John Doe", email: "john.doe@email.com", memberSince: "2022" });
});

export default router;
