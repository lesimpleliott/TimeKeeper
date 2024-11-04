"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between bg-gray-100 p-4">
      <nav className="flex items-center">
        <Link
          className={`rounded-md px-4 py-1 ${
            pathname === "/"
              ? "bg-blue-100 text-blue-500"
              : "hover:text-blue-500"
          }`}
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className={`rounded-md px-4 py-1 ${
            pathname === "/tasks"
              ? "bg-blue-100 text-blue-500"
              : "hover:text-blue-500"
          }`}
          href="/tasks"
        >
          Tasks
        </Link>
        <Link
          className={`rounded-md px-4 py-1 ${
            pathname === "/tags"
              ? "bg-blue-100 text-blue-500"
              : "hover:text-blue-500"
          }`}
          href="/tags"
        >
          Tags
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <button className="h-9 rounded-lg bg-blue-500 px-4 text-white hover:bg-blue-600">
          Start Timer
        </button>
        <Image
          src="/eliott.webp"
          alt="Avatar"
          height={100}
          width={100}
          className="h-10 w-10 rounded-full object-cover shadow-md"
        />
      </div>
    </header>
  );
};

export default Navbar;
