import { API_ROUTES } from "@/constants/apiRoutes";
import { TaskType } from "@/types/task";

/**
 * Récupère toutes les tâches depuis l'API.
 * @returns {Promise<TaskType[]>} Un tableau de tâches.
 * @throws {Error} En cas d'erreur réseau ou de serveur.
 */
export const fetchTasks = async (): Promise<TaskType[]> => {
  const response = await fetch(API_ROUTES.TASKS);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const data = await response.json();
  return data.tasks;
};

/**
 * Crée une nouvelle tâche.
 * @param {Partial<TaskType>} task Les informations de la nouvelle tâche.
 * @returns {Promise<TaskType>} La tâche créée.
 * @throws {Error} En cas d'erreur lors de la création.
 */
export const createTask = async (
  task: Partial<TaskType>,
): Promise<TaskType> => {
  const response = await fetch(API_ROUTES.TASKS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Failed to create task");
  const data = await response.json();
  return data.task;
};

/**
 * Supprime une tâche par ID.
 * @param {string} id L'identifiant de la tâche.
 * @returns {Promise<void>} Une promesse résolue une fois la tâche supprimée.
 * @throws {Error} En cas d'erreur réseau ou de serveur.
 */
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_ROUTES.TASKS}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
};
