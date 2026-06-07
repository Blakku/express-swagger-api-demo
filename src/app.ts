import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/auth", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs on http://localhost:${PORT}/api-docs`);
});