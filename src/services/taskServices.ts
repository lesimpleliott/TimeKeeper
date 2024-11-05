import { TaskType } from "@/types/task";

/**
 * Récupère toutes les tâches depuis l'API.
 * @returns {Promise<TaskType[]>} - Un tableau de tâches ou une erreur si la récupération échoue.
 */
export const fetchTasks = async (): Promise<TaskType[]> => {
  try {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    if (data.success) {
      return data.tasks;
    } else {
      console.error("Failed to fetch tasks");
      return [];
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
