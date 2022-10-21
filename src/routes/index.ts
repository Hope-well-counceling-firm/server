import express from "express";
import AUTH_ROUTES from "./auth.routes";

const router = express.Router();
router.use("/users", AUTH_ROUTES);

export default router;
