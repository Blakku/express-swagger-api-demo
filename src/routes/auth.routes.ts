import { Router, Request, Response } from "express";
import { users } from "../data/db";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(user);

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

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
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  return res.json({
    message: "Login successful",
    token: "fake-jwt-token",
    user,
  });
});

export default router;