import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { getCode } from "../../helpers";
import { generateMail, sendMail } from "../../mail";
import { createRegistrationSession } from "../../middlewares/registrationSession";
import { USER_MODEL } from "../../models";

export const registerUser = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  try {
    const user = await USER_MODEL.findOne({ email, phoneNumber })
      .select("password")
      .exec();
    if (!isEmpty(user))
      return res
        .status(403)
        .json({ message: "user with provided details already exists" });
    const code = getCode();
    const newUser = await new USER_MODEL({
      email,
      //  phone: phoneNumber,
      auth_code: code,
      disabled: true,
    });
    const savedUser = await newUser.save();

    const registrationSessionToken = createRegistrationSession({
      email: savedUser.email,
    });

    const errorMessage =
      "Something went wrong with your registration. Please try again later.";
    const jysonDAta = {
      message: `a code has been sent to ${email || phoneNumber}`,
      registrationSessionToken,
    };
    return sendMail(
      generateMail({
        to: savedUser.email,
        subject: "Confirm registration",
        text: `
        Hi ${savedUser.name},
          <p>Your confirm registration code is ${code}</p>
          <h6>NB: do not share this code with anybody</h6>
          <h6>if this code is a mistake please ignore it</h6>
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
