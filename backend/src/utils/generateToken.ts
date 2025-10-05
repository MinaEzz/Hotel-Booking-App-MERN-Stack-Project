import jwt from "jsonwebtoken";
import { Response } from "express";

function generateTokenAndSetCookies(
  userId: string,
  isAdmin: boolean,
  res: Response
) {
  const token = jwt.sign({ id: userId, isAdmin }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d",
  });
  console.log("TOKEN: ", token);

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  });
}

export default generateTokenAndSetCookies;
