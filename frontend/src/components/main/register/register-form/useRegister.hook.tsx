"use client";

import { useEffect, useState, useTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
// import { useFormState } from "react-dom";
import { IRegisterFormValues, IRegisterState } from "./register.types";
import { register } from "./register.action";

export function useRegister() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<IRegisterFormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const [state, formAction] = useActionState<IRegisterState, FormData>(
    register,
    {
      success: false,
      errors: [],
      message: "",
    }
  );

  const [isPending, startTransition] = useTransition();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  useEffect(() => {
    if (state.success) {
      setFormValues({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/login");
    }
  }, [state.success]);

  return { formValues, handleChange, state, handleSubmit, isPending };
}
