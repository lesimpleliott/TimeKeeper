import { TaskType } from "@/types/task";

const TaskTagList = ({ task }: { task: TaskType }) => {
  const isCompleted = !!task.end;

  return (
    <div className="flex items-center gap-1">
      {isCompleted ? (
        task.tags.map((tag, index) => (
          <span
            key={index}
            className="h-1 w-6 overflow-hidden rounded-full bg-gray-300 px-2 py-px text-xs text-black sm:h-fit sm:w-fit"
          >
            {tag}
          </span>
        ))
      ) : (
        <div className="flex items-center gap-2 rounded-full bg-green-200 px-2 py-px">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-full w-full rounded-full bg-green-500"></span>
          </span>
          <p className="text-xs text-green-700">in progress</p>
        </div>
      )}
    </div>
  );
};

export default TaskTagList;
