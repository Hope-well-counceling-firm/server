import { Response } from "express";
import { isEmpty } from "lodash";
import { createAcessToken, createRefreshToken } from "../../middlewares";
import { USER_MODEL } from "../../models";
import bcryptjs from "bcryptjs";

export const loginUser = async (req: any, res: Response) => {};
