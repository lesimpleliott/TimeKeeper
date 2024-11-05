/**
 * Détermine si une tâche est terminée ou en cours.
 * @param task - L'objet `TaskType` représentant la tâche.
 * @returns `true` si la tâche est terminée, `false` si elle est en cours.
 */

import { TaskType } from "@/types/task";

export function isTaskCompleted(task: TaskType): boolean {
  const now = new Date();

  // Si la tâche n'a pas de date de fin, elle est considérée comme en cours
  if (!task.end) {
    return false;
  }

  // Retourne `true` si la date actuelle est après ou égale à la date de fin
  return now >= new Date(task.end);
}
