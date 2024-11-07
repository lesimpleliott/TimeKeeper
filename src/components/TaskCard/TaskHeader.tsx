import { TaskType } from "@/types/task";
import { getDuration } from "@/utils/dateParser";
import { useEffect, useState } from "react";

const TaskHeader = ({ task }: { task: TaskType }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center">
      <h2 className="truncate text-sm font-medium">{task.title}</h2>
      <p className="overflow-hidden truncate whitespace-nowrap text-xs text-gray-500">
        {task.end
          ? `Durée : ${getDuration(task.start, task.end)}`
          : `Temps écoulé : ${getDuration(task.start, currentTime)}`}
      </p>
    </div>
  );
};

export default TaskHeader;
