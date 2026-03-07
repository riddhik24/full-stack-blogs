import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface Task {
  task: string | object | null;
}
const initialState: Task = {
  task: localStorage.getItem("tasks"),
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string | object>) => {
      state.task = action.payload;
      localStorage.setItem("tasks", JSON.stringify(action.payload));
    },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
