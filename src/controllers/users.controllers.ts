import { Request, Response } from "express";
import { USER_MODEL } from "../models";

export const getSingleUser = async (req: Request, res: Response) => {};
export const resetUserPassword = async (req: Request, res: Response) => {};
export const updateUser = async (req: Request, res: Response) => {};
export const getAllUsers = async (req: Request, res: Response) => {
  console.log("here");
  try {
    res.status(200).json({
      users: USER_MODEL.find().exec(),
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
