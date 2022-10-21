import { createTransport } from "nodemailer";
import { Response } from "express";
const email = process.env.PRIMARY_EMAIL;
const password = process.env.PRIMARY_EMAIL_PASSWORD; //"@2020Devops.";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const generateMail = ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => ({
  from: email,
  to: to || email,
  subject,
  text,
});

export const sendMail = (
  options: any,
  res?: Response,
  errorMessage?: string,
  jysonDAta?: string | object
) => {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      res &&
        res
          .status(500)
          .json({ message: errorMessage ? errorMessage : error.message });
    } else {
      res?.status(200).json(jysonDAta);
      console.log("Email sent: " + info.response);
    }
  });
};
