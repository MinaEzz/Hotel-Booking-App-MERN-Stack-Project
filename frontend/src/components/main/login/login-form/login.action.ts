"use server";
import { ILoginState } from "./login.types";

export async function login(_prevState: ILoginState, formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      }
    );

    const data = await response.json();
    console.log("login action response data", data);
    if (data.status !== "Success") {
      return {
        success: false,
        errors: data.data,
        message: data.message,
      };
    }
    return {
      success: true,
      message: data.message,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "Unexpected error",
    };
  }
}
