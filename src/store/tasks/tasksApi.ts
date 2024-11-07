import { TaskType } from "@/types/task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Tasks"],

  // Définition des endpoints
  endpoints: (builder) => ({
    fetchTasks: builder.query<TaskType[], void>({
      query: () => "/tasks",
      transformResponse: (response: { tasks: TaskType[] }) => response.tasks, // Formate la réponse pour ne retourner que les tâches
      providesTags: ["Tasks"],
    }),

    // Ajout d'une tâche
    addTask: builder.mutation<TaskType, Partial<TaskType>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // Suppression d'une tâche
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useFetchTasksQuery, useAddTaskMutation, useDeleteTaskMutation } =
  tasksApi;
