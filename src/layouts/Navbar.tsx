"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between py-4">
      <nav className="flex items-center gap-3">
        <Link
          className={`rounded-md py-1 font-medium ${
            pathname === "/"
              ? "bg-blue-100 px-2 font-semibold text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className={`rounded-md py-1 font-medium ${
            pathname === "/tasks"
              ? "bg-blue-100 px-2 font-semibold text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          href="/tasks"
        >
          Tasks
        </Link>
        <Link
          className={`rounded-md py-1 font-medium ${
            pathname === "/tags"
              ? "bg-blue-100 px-2 font-semibold text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          href="/tags"
        >
          Tags
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <button className="h-9 rounded-lg bg-blue-500 px-4 text-sm text-white hover:bg-blue-600">
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
