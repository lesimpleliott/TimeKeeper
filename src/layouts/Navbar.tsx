"use client";

import { useTaskHandlers } from "@/hooks/swr/useTaskHandlers";
import { useTasks } from "@/hooks/swr/useTasks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { mutate } = useTasks(); // Hook pour accéder au mutate
  const { handleCreateTask } = useTaskHandlers(mutate); // Injecte mutate dans handleCreateTask

  const startNewTask = async () => {
    try {
      // Créer une nouvelle tâche avec un titre par défaut et la date actuelle
      await handleCreateTask("Nouvelle tâche", new Date().toISOString());
      // console.log("Nouvelle tâche créée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création de la tâche :", error);
    }
  };

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
        <button
          onClick={startNewTask}
          className="h-9 rounded-lg bg-blue-500 px-4 text-sm text-white hover:bg-blue-600"
        >
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
