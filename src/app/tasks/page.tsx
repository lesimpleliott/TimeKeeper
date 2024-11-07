"use client";

import TaskCard from "@/components/TaskCard";
import { useFetchTasksQuery } from "@/store/tasks/tasksApi";

export default function Tasks() {
  // Récupère les tâches
  const { data: tasks, isLoading, isError } = useFetchTasksQuery();
  if (isLoading) return <div>Chargement des tâches...</div>;
  if (isError) return <div>Erreur lors du chargement des tâches.</div>;
  if (!tasks) return null;

  // Tri des tâches par date de début décroissante
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime(),
  );

  return (
    <section className="flex flex-col divide-y">
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </section>
  );
}
