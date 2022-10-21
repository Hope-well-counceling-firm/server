import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { getCode } from "../../helpers";
import { generateMail, sendMail } from "../../mail";
import { createRegistrationSession } from "../../middlewares";
import { USER_MODEL } from "../../models";

export const requestLoginUser = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
  try {
    const user = await USER_MODEL.findOne({ email, phoneNumber })
      .select("refreshToken")
      .select("auth_code")
      .select("disabled")
      .select("deleted")
      .exec();

    if (isEmpty(user))
      return res.status(404).json({
        message: "Sorry, User does not exist",
      });

    if (user?.disabled)
      return res
        .status(401)
        .json({ message: "Please validate your account before you can login" });
    if (user?.deleted)
      res.status(404).json({ message: "sorry , User does not exist" });
    const code = getCode();
    user.auth_code = code;
    const loginTokenSession = createRegistrationSession({ email: user.email });
    await user.save();
    const errorMessage = "something went wrong";
    const jysonDAta = {
      message: `a code has been sent to ${
        email || phoneNumber
      } please use the code to login`,
      loginTokenSession,
    };
    return await sendMail(
      generateMail({
        to: user.email,
        subject: "Verify user Login",
        text: `
        Hi ${user.name},
          <p>Your login one time code is ${code}</p>
          <h6>NB: do not share this code with anybody</h6>
          `,
      }),
      res,
      errorMessage,
      jysonDAta
    );
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
