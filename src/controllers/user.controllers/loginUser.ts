import { Response } from "express";
import { isEmpty } from "lodash";
import { createAcessToken, createRefreshToken } from "../../middlewares";
import { USER_MODEL } from "../../models";
import bcryptjs from "bcryptjs";

export const loginUser = async (req: any, res: Response) => {
  try {
    const { email: tokenEmail } = req.user;

    const { email: formEmail, phoneNumber, code, password } = req.body;

    const email = tokenEmail || formEmail;
    const user = await USER_MODEL.findOne({ email, phoneNumber })
      .select("refreshToken")
      .select("auth_code")
      .select("password")
      .select("disabled")
      .select("deleted")
      .exec();

    if (user?.disabled || user?.deleted)
      return res
        .status(401)
        .json({ message: "please contact the administrator" });
    if (isEmpty(user)) return res.status(404).send("Sorry,User does not exist");
    if (!code && !password)
      return res.status(404).send("Please enter your password or OTP code ");
    if (code && Number(user?.auth_code) !== Number(code))
      return res.status(401).json({ message: "Invalid Code" });
    if (password && !bcryptjs.compareSync(password, user?.password))
      return res.status(401).json({ message: "Invalid Password" });
    const accessToken = createAcessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    user.auth_code = 0;
    const updatedUser = await user.save();
    res.status(200).json({
      results: {
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        photo_Url: updatedUser.photo_Url,
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
