import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar bg-base-100 shadow-sm fixed justify-between z-40 px-12">
      <Link href={"/"} className="btn btn-link text-3xl font-heading">
        StayBook
      </Link>

      <ul className="w-fit flex items-center gap-4">
        <li>
          <Link href={"/login"} className="btn btn-ghost">
            Login
          </Link>
        </li>
        <li>
          <Link href={"/register"} className="btn btn-primary">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
