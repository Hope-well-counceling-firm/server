import { USER_MODEL } from "../../models";

import { Response, Request } from "express";

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await USER_MODEL.findOne({ email }).select("deleted").exec();
  } catch (error) {}
};
