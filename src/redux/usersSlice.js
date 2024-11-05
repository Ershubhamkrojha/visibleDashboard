import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Thunks for async CRUD actions

// Fetch all users
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://visible-gain-dashboard.onrender.com/user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toJSON() || error.message);
    }
  }
);

// Fetch a single user by ID
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://visible-gain-dashboard.onrender.com/user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toJSON() || error.message);
    }
  }
);



// Update an existing user by ID
export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://visible-gain-dashboard.onrender.com/user/${id}`, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Delete a user by ID
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response=await axios.delete(`https://visible-gain-dashboard.onrender.com/user/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.toJSON() || error.message);
    }
  }
);

// Initial state
const initialState = {
  users: [],
  selectedUser: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Slice definition
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        // Store only the error message or any relevant properties
        state.error = action.payload?.message || action.error.message || 'An error occurred';
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
  
  },
});

// Export actions and reducer
export const { resetSelectedUser, clearError } = userSlice.actions;
export default userSlice.reducer;
