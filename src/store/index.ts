import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./tasks/tasksApi";

export const store = configureStore({
  reducer: {
    // tasks: tasksReducer, // Gestion locale des tâches via Redux Toolkit (à activer si besoin)
    [tasksApi.reducerPath]: tasksApi.reducer, // Gestion des tâches via RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
