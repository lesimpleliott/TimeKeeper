import useSWR, { KeyedMutator } from "swr";
import { fetchTasks } from "@/services/taskApi";
import { TaskType } from "@/types/task";
import { API_ROUTES } from "@/constants/apiRoutes";

type UseTasksReturn = {
  tasks: TaskType[];
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<TaskType[]>;
};

/**
 * Hook personnalisé pour récupérer les tâches via SWR.
 * @returns {UseTasksReturn} Données des tâches, états et fonction mutate.
 */
export const useTasks = (): UseTasksReturn => {
  const { data, error, mutate } = useSWR<TaskType[]>(API_ROUTES.TASKS, fetchTasks);

  return {
    tasks: data || [],
    isLoading: !data && !error,
    isError: !!error,
    mutate,
  };
};
