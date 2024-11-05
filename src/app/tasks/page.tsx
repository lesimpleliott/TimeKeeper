"use client";

import TaskCard from "@/components/TaskCard";
import { fetchTasks } from "@/services/taskServices"; // Import de la fonction
import { TaskType } from "@/types/task";
import { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    getTasks();
  }, []);

  return (
    <section className="flex flex-col divide-y">
      {tasks
        .sort(
          (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime(),
        )
        .map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
    </section>
  );
}
