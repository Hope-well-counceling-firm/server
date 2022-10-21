import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { accessTokenDAta } from "./types";

const acessTokenSecrate = process.env.JWT_ACCESS_TOKEN_SECRET || "SOME_SECRET";
export const validateAcessToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  jwt.verify(token, acessTokenSecrate, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid jwt token" });
    }
    req.user = user;
    // req.user to get user info
    next();
  });
};

export const createAcessToken = (data: accessTokenDAta) =>
  jwt.sign(data, acessTokenSecrate, {
    expiresIn: "1d",
  });
