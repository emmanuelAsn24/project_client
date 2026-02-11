import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

const initialState = {
  tasks: [],
  status: "idle", // idle, loading, success, failed
  error: "",
  filter: "all", // all, completed, active
};

const getToken = () => localStorage.getItem("token");

export const getTask = createAsyncThunk("task/getTask", async (userId, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log('Fetching tasks for user:', userId);
      console.log('Token present:', !!token);
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const { data } = await axios.get(`${URL}/api/v1/tasks/${userId}`, {
        headers: { Authorization: token},
      });
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const createTask = createAsyncThunk(
  "task/createTask",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log('Creating task with token:', token ? 'Present' : 'Missing');
      console.log('Payload:', payload);
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const { data } = await axios.post(`${URL}/api/v1/tasks`, payload, {
        headers: { Authorization: token},
      });
      console.log('Task created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log('Updating task:', payload._id);
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const { data } = await axios.post(
        `${URL}/api/v1/tasks/${payload._id}`,
        payload,
        {
          headers: { Authorization: token },
        },
      );
      console.log('Task updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteTask = createAsyncThunk("task/deleteTask", async (id, { rejectWithValue }) => {
  try {
    const token = getToken();
    console.log('Deleting task:', id);
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const { data } = await axios.delete(`${URL}/api/v1/tasks/${id}`, {
      headers: { Authorization: ` ${token}` },
    });
    console.log('Task deleted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error deleting task:', error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteManyTask = createAsyncThunk(
  "task/deleteManyTask",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log('Deleting multiple tasks:', payload);
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const { data } = await axios.post(`${URL}/api/v1/delete-many`, payload, {
        headers: { Authorization: token},
      });
      console.log('Tasks deleted successfully:', data);
      return data;
    } catch (error) {
      console.error('Error deleting tasks:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSatusToIdle: (state) => {
      state.status = "idle";
    },
    initState: (state) => {
      state.tasks = [];
      state.status = "idle";
      state.error = null;
      state.filter = "all";
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // ============== GET TASK ==============
      .addCase(getTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = [...action.payload];
      })
      .addCase(getTask.rejected, (state, action) => { // ✅ FIX 1: Ajout de 'action'
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Failed to fetch tasks";
      })

      // ============== DELETE MANY TASK ==============
      .addCase(deleteManyTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteManyTask.fulfilled, (state, action) => {
        const { deletedCount, ids } = action.payload;
        state.status = "success";
        if (deletedCount > 0) {
          state.tasks = state.tasks.filter(
            (value) => !ids.includes(value._id), // ✅ Amélioration: includes au lieu de indexOf
          );
        }
      })
      .addCase(deleteManyTask.rejected, (state, action) => { // ✅ FIX 2: Ajout de 'action'
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Failed to delete tasks";
      })

      // ============== CREATE TASK ==============
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks.push(action.payload);
        state.error = "";
      })
      .addCase(createTask.rejected, (state, action) => { // ✅ FIX 3: Ajout de 'action'
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Failed to create task";
      })

      // ============== UPDATE TASK ==============
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = state.tasks.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo,
        );
        state.error = "";
      })
      .addCase(updateTask.rejected, (state, action) => { // ✅ FIX 4: Ajout de 'action'
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Failed to update task";
      })

      // ============== DELETE TASK ==============
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = state.tasks.filter(
          (todo) => todo._id !== action.payload._id,
        );
        state.error = "";
      })
      .addCase(deleteTask.rejected, (state, action) => { // ✅ FIX 5: Ajout de 'action'
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Failed to delete task";
      });
  },
});

export const selectAllTasks = (state) => state.taskReducer.tasks;
export const getTaskStatus = (state) => state.taskReducer.status;
export const getTaskError = (state) => state.taskReducer.error;
export const getFilter = (state) => state.taskReducer.filter;
export const getCompleted = (state) => state.taskReducer.tasks.filter((task) => task.completed === true);

export const { initState, setSatusToIdle, changeFilter } = taskSlice.actions;

export default taskSlice.reducer;