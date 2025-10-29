"use client";
import Link from "next/link";
import { useRegister } from "./useRegister.hook";

export default function RegisterForm() {
  const { formValues, state, handleSubmit, handleChange, isPending } =
    useRegister();
  console.log("Register State: ", state);

  return (
    <form
      className="max-w-xl overflow-y-auto bg-white rounded-xl border border-gray-200 py-6 px-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col items-center gap-2 text-center capitalize">
        <h1 className="text-4xl text-black font-semibold font-heading">
          Create Account
        </h1>
        <p className="text-xl text-gray-700">
          Sign up to start booking amazing hotels
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 mt-6">
        <label className="w-full flex flex-col gap-2">
          <span className="text-base text-black capitalize">Username</span>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl bg-transparent p-2 outline-none"
            placeholder="JohnDoe"
          />
          {state.errors?.find((e) => e.field === "username") && (
            <p className="text-red-500 text-sm">
              {state.errors.find((e) => e.field === "username")?.message}
            </p>
          )}
        </label>
        <label className="w-full flex flex-col gap-2">
          <span className="text-base text-black capitalize">Email</span>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl bg-transparent p-2 outline-none"
            placeholder="n0N0b@example.com"
          />
          {state.errors?.find((e) => e.field === "email") && (
            <p className="text-red-500 text-sm">
              {state.errors.find((e) => e.field === "email")?.message}
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
        <label className="w-full flex flex-col gap-2">
          <span className="text-base text-black capitalize">
            Confirm Password
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl bg-transparent p-2 outline-none"
            placeholder="**********"
          />
          {state.errors?.find((e) => e.field === "confirmPassword") && (
            <p className="text-red-500 text-sm">
              {state.errors.find((e) => e.field === "confirmPassword")?.message}
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
          {isPending ? "Registering..." : "Register"}
        </button>
        <span className="text-xl text-black/80 uppercase">OR</span>
        <Link href={"/login"} className="w-full btn  btn-outline">
          Login
        </Link>
      </div>
    </form>
  );
}
