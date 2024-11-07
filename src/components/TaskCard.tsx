import { TaskType } from "@/types/task";
import ActionMenu from "./TaskCard/ActionMenu";
import CalendarIcon from "./TaskCard/CalendarIcon";
import TaskHeader from "./TaskCard/TaskHeader";
import TaskTagList from "./TaskCard/TaskTagList";

const TaskCard = (task: TaskType) => {
  return (
    <article className="flex justify-between">
      <CalendarIcon date={task.start} />

      <section className="flex min-w-0 flex-1 flex-col gap-1 px-3 py-2 sm:flex-row">
        <TaskHeader task={task} />
        <TaskTagList task={task} />
      </section>

      <ActionMenu taskID={task.id} isCompleted={!!task.end} />
    </article>
  );
};

export default TaskCard;
