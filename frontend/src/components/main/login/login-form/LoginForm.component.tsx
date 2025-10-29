"use client";
import Link from "next/link";
import { useLogin } from "./useLogin.hook";

export default function LoginForm() {
  const { formValues, handleChange, state, isPending, handleSubmit } =
    useLogin();
  console.log("Login State: ", state);

  return (
    <form
      className="max-w-xl overflow-y-auto bg-white rounded-xl border border-gray-200 py-6 px-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col items-center gap-2 text-center capitalize">
        <h1 className="text-4xl text-black font-semibold font-heading">
          Welcome Back
        </h1>
        <p className="text-xl text-gray-700">
          Login to your account to continue
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 mt-6">
        <label className="w-full flex flex-col gap-2">
          <span className="text-base text-black capitalize">
            Username / Email Address
          </span>
          <input
            type="text"
            name="identifier"
            value={formValues.identifier}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl bg-transparent p-2 outline-none"
            placeholder="n0N0b@example.com"
          />
          {state.errors?.find((e) => e.field === "identifier") && (
            <p className="text-red-500 text-sm">
              {state.errors.find((e) => e.field === "identifier")?.message}
            </p>
          )}
        </label>

        <label className="w-full flex flex-col gap-2">
          <span className="text-base text-black capitalize">Password</span>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl bg-transparent p-2 outline-none"
            placeholder="**********"
          />
          {state.errors?.find((e) => e.field === "password") && (
            <p className="text-red-500 text-sm">
              {state.errors.find((e) => e.field === "password")?.message}
            </p>
          )}
        </label>
      </div>

      <div className="w-full flex flex-col items-center gap-4 mt-6">
        <button
          type="submit"
          className="w-full btn  btn-primary"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
        <span className="text-xl text-black/80 uppercase">OR</span>
        <Link href={"/register"} className="w-full btn  btn-outline">
          Create An Account
        </Link>
      </div>
    </form>
  );
}
