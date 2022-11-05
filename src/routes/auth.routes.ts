import express from "express";
import { forgotPassword } from "../controllers/user.controllers/forgotPassword";
import { loginUser } from "../controllers/user.controllers/loginUser";
import { refreshToken } from "../controllers/user.controllers/refreshToken";
import { RegisterUser } from "../controllers/user.controllers/RegisterUser";
import { updateUser } from "../controllers/user.controllers/updateUser";

import {
  validateAcessToken,
  validateRegistrationSession,
} from "../middlewares";

const router = express.Router();

router.post("/Login", loginUser);
router.post("/register", RegisterUser);
router.post("/forgotPassword", forgotPassword);
router.post("/refreshToken", refreshToken);
router.put("/updateUser", updateUser);
export default router;
