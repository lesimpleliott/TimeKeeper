/**
 * Ajout d'un slice pour gérer les tâches localement
 * DÉSACTIVÉ PAR DÉFAUT
 *
 * Pour l'activer, ajouter le reducer dans le store (src/store/index.ts) :
 * import tasksReducer from "./tasks/tasksSlice";
 *  reducer: {
    tasks: tasksReducer, // Gestion locale des tâches
    // ... autres reducers
  },
 * 
 */

import { TaskType } from "@/types/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
  tasks: TaskType[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
