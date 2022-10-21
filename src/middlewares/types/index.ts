import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export type accessTokenDAta = {
  email: string;
  phoneNumber?: string | undefined;
};

export interface accessTokenRequest extends Request {
  user: accessTokenDAta | string | JwtPayload | undefined;
}
