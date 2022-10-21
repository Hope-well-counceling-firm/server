import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { accessTokenDAta } from "./types";

const registrationSecrate = process.env.JWT_AUTH_SECRET || "myownsecrate";

export function createRegistrationSession(data: accessTokenDAta) {
  return jwt.sign(data, registrationSecrate, {
    expiresIn: "20m", // "1800s"
  });
}

export const validateRegistrationSession = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  const { registrationSessionToken, loginTokenSession } = req.body;
  const token = registrationSessionToken || loginTokenSession;
  if (!token) {
    return res.status(401).json({ message: " token not provided" });
  }

  try {
    jwt.verify(
      token,
      registrationSecrate,
      (err: any, user: accessTokenDAta | string | JwtPayload | undefined) => {
        if (err) {
          return res
            .status(403)
            .json({ message: `Invalid token provided ${err.message}` });
        }

        req.user = user;
        next();
      }
    );
  } catch (error) {}
};
