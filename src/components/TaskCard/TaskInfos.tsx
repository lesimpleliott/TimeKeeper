"use client";
import { TaskType } from "@/types/task";
import { getDuration } from "@/utils/dateParser";
import { useEffect, useState } from "react";

type TaskInfosProps = {
  task: TaskType;
};

const TaskInfos = ({ task }: TaskInfosProps) => {
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  useEffect(() => {
    // Crée un intervalle qui met à jour l'heure actuelle toutes les secondes
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex min-w-0 flex-1 flex-col justify-center px-3">
      <h2 className="truncate text-sm font-medium">
        {task.title ? task.title : "Tâche en cours"}
      </h2>
      <p className="overflow-hidden truncate whitespace-nowrap text-xs text-gray-500">
        {task.end
          ? `Durée : ${getDuration(task.start, task.end)}`
          : `Temps écoulé : ${getDuration(task.start, currentTime)}`}
      </p>
    </section>
  );
};

export default TaskInfos;
