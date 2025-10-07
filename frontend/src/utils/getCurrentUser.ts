"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export default async function getCurrentUserData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as ITokenPayload;

    return {
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
