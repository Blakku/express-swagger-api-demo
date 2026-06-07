import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: test@example.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", (req, res) => {
  res.json({
    message: "Login successful",
    token: "sample-jwt-token"
  });
});

export default router;