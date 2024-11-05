import { TaskType } from "@/types/task";
import { isTaskCompleted } from "@/utils/taskStatus";
import ActionMenu from "./ActionMenu";
import CalendarIcon from "./CalendarIcon";
import InProgressTag from "./InProgressTag";
import TagList from "./TagList";
import TaskInfos from "./TaskInfos";

const TaskCard = ({ ...task }: TaskType) => {
  const isCompleted = isTaskCompleted(task);

  return (
    <>
      <article key={task.id} className={`flex justify-between`}>
        {isCompleted ? (
          <>
            <CalendarIcon date={task.start} />
            <TaskInfos task={task} />
            <TagList tags={task.tags} />
            <ActionMenu
              onView={() => console.log("Viewing task", task.id)}
              onEdit={() => console.log("Editing task", task.id)}
              onDelete={() => console.log("Deleting task", task.id)}
            />
          </>
        ) : (
          <>
            <CalendarIcon date={task.start} />
            <TaskInfos task={task} />
            <InProgressTag />
            <ActionMenu
              onDelete={() => console.log("Deleting task", task.id)}
              onStop={() => console.log("Stopping task", task.id)}
            />
          </>
        )}
      </article>
    </>
  );
};

export default TaskCard;
