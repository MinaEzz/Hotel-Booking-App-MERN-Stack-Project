"use server";
import { IRegisterState } from "./register.types";

export async function register(_prevState: IRegisterState, formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      }
    );

    const data = await response.json();
    console.log("register action response data", data);

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
