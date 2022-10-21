import { isEmpty } from "lodash";
import { Response } from "express";
import bcryptjs from "bcryptjs";
import { USER_MODEL } from "../../models";

export const confirmRegisterUser = async (req: any, res: Response) => {
  const { password, code, name } = req.body;
  const { email, phoneNumber } = req?.user;

  try {
    const user = await USER_MODEL.findOne({ email, phoneNumber })
      .select("disabled")
      .select("password")
      .select("auth_code")
      .exec();

    if (isEmpty(user))
      return res.status(403).json({ message: "Sorry, User does not exist" });

    if (Number(code) !== user?.auth_code)
      return res.status(403).json({
        message: "Incorrect code",
      });
    const hashedPassword = password && (await bcryptjs.hash(password, 12));
    user.disabled = false;
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = hashedPassword || user.password;
    user.auth_code = 0;
    const savedUser = await user.save();
    res
      .status(200)
      .send({ message: "Account created succesfully", result: savedUser });
  } catch (error) {}
};
