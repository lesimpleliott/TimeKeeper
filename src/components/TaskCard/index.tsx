import { useTaskHandlers } from "@/hooks/swr/useTaskHandlers";
import { TaskType } from "@/types/task";
import { isTaskCompleted } from "@/utils/taskStatus";
import { KeyedMutator } from "swr";
import ActionMenu from "./ActionMenu";
import CalendarIcon from "./CalendarIcon";
import InProgressTag from "./InProgressTag";
import TagList from "./TagList";
import TaskInfos from "./TaskInfos";

// Déclare un type pour inclure `mutate`
type TaskCardProps = TaskType & {
  mutate: KeyedMutator<TaskType[]>; // Ajout de mutate ici
};

const TaskCard = ({ mutate, ...task }: TaskCardProps) => {
  const isCompleted = isTaskCompleted(task);
  const { handleDeleteTask } = useTaskHandlers(mutate); // Injecte mutate dans le handler

  const onDelete = async () => {
    try {
      await handleDeleteTask(task.id!); // Suppression avec validation locale
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <article className="flex justify-between">
      {isCompleted ? (
        <>
          <CalendarIcon date={task.start} />
          <TaskInfos task={task} />
          <TagList tags={task.tags} />
          <ActionMenu
            onView={() => console.log("Viewing task", task.id)}
            onEdit={() => console.log("Editing task", task.id)}
            onDelete={onDelete}
          />
        </>
      ) : (
        <>
          <CalendarIcon date={task.start} />
          <TaskInfos task={task} />
          <InProgressTag />
          <ActionMenu
            onDelete={onDelete}
            onStop={() => console.log("Stopping task", task.id)}
          />
        </>
      )}
    </article>
  );
};

export default TaskCard;
