// src/redux/taskSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Fetch tasks from the API
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
});

// Update task status
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async (task) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${task.id}`,
      task
    );
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index >= 0) {
          state.tasks[index] = updatedTask;
        }
      });
  },
});

export default taskSlice.reducer;
