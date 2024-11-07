"use client";

import { useFetchTasksQuery } from "@/store/tasks/tasksApi";

export default function Home() {
  const { data: tasks, isLoading, isError } = useFetchTasksQuery();
  if (isLoading) return <div>Chargement des tâches...</div>;
  if (isError) return <div>Erreur lors du chargement des tâches.</div>;
  if (!tasks) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Exemple / test */}
      <h1 className="text-2xl font-semibold">Welcome to Next.js!</h1>
      <section>
        <h2 className="text-lg font-semibold">La liste des tâches</h2>
        {tasks.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </section>
    </div>
  );
}
