"use client";

import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/hooks/swr/useTasks";

export default function Tasks() {
  const { tasks, isLoading, isError, mutate } = useTasks(); // Utilisation du hook personnalisé

  if (isError) return <div>Erreur lors du chargement des tâches.</div>;
  if (isLoading) return <div>Chargement...</div>;

  return (
    <section className="flex flex-col divide-y">
      {tasks
        .sort(
          (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime(),
        )
        .map((task) => (
          <TaskCard key={task.id} {...task} mutate={mutate} />
        ))}
    </section>
  );
}
