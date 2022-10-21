import { accessTokenDAta, accessTokenRequest } from "./types";
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const refreshTokenSecrate =
  process.env.REFRESH_TOKEN_SECRATE || "somethingfuntastic";

export const createRefreshToken = (data: accessTokenDAta) =>
  jwt.sign(data, refreshTokenSecrate, {
    expiresIn: "30d",
  });

export const validateRefresh = async (
  req: accessTokenRequest,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  jwt.verify(
    refreshToken,
    refreshTokenSecrate,
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
};
