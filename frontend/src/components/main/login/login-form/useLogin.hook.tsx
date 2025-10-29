"use client";

import { useState, useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ILoginFormValues, ILoginState } from "./login.types";
import { login } from "./login.action";
import toast from "react-hot-toast";

export function useLogin() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<ILoginFormValues>({
    identifier: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const [state, formAction] = useActionState<ILoginState, FormData>(login, {
    success: false,
    errors: [],
    message: "",
  });

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      setFormValues({
        identifier: "",
        password: "",
      });
      router.push("/verify-otp");
      toast.success(
        state.message ||
          "Login successful! Please verify the OTP sent to your email to continue"
      );
    } else {
      toast.error(state.message || "Login Failed!");
    }
  }, [state, router]);

  return { formValues, handleChange, state, isPending, handleSubmit };
}
