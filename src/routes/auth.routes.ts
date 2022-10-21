import express from "express";
import {
  deleteUser,
  getSingleUser,
  loginUser,
  registerUser,
  requestLoginUser,
  resetUserPassword,
  updateUser,
  confirmRegisterUser,
  getAllUsers,
  requestDeleteUser,
} from "../controllers";
import {
  validateAcessToken,
  validateRegistrationSession,
} from "../middlewares";

const router = express.Router();

router.post("/requestLogin", requestLoginUser);
router.post("/login-otp", validateRegistrationSession, loginUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post<any>(
  "/confirm-register",
  validateRegistrationSession,
  confirmRegisterUser
);
router.get("/user:id", getSingleUser);
router.post("/resetPassword", resetUserPassword);
router.put("/updateUser", updateUser);
router.post("reduest-delete:id", validateAcessToken, requestDeleteUser);
router.delete("/user:id", validateAcessToken, deleteUser);
router.get("/", getAllUsers);

export default router;
