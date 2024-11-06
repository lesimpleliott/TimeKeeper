import { createTask, deleteTask } from "@/services/taskApi";
import { TaskType } from "@/types/task";
import { KeyedMutator } from "swr";

export const useTaskHandlers = (mutate: KeyedMutator<TaskType[]>) => {
  /**
   * Crée une nouvelle tâche et met à jour le cache SWR.
   * @param {string} title - Le titre de la tâche.
   * @param {string} start - La date de début (ISO string).
   */
  const handleCreateTask = async (
    title: string,
    start: string,
  ): Promise<void> => {
    try {
      const newTask = await createTask({ title, start } as TaskType);
      mutate((tasks) => (tasks ? [...tasks, newTask] : [newTask]), false);
      // console.log("Task created:", newTask);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  /**
   * Supprime une tâche et met à jour le cache SWR.
   * @param {string} id - L'ID de la tâche à supprimer.
   */
  const handleDeleteTask = async (id: string): Promise<void> => {
    try {
      await deleteTask(id);
      mutate((tasks) => tasks?.filter((task) => task.id !== id) || [], false);
      // console.log(`Task ${id} deleted`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return { handleCreateTask, handleDeleteTask };
};
