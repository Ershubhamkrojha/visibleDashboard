import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Thunks for async CRUD actions

// Fetch all photo sessions
export const fetchPhotoSessions = createAsyncThunk(
  'photoSessions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://visible-gain-dashboard.onrender.com/photoSession');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toJSON() || error.message);
    }
  }
);

// Fetch a single photo session by ID
export const fetchPhotoSessionById = createAsyncThunk(
  'photoSessions/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://visible-gain-dashboard.onrender.com/photoSession/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toJSON() || error.message);
    }
  }
);

// Create a new photo session


// Thunk to create a photo session
export const createPhotoSession = createAsyncThunk(
  'photoSessions/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://visible-gain-dashboard.onrender.com/photoSession/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      return response.data; // Includes both message and data
    } catch (error) {
      // Log the error for debugging
      console.error('Error creating photo session:', error);

      // Use rejectWithValue to handle errors cleanly
      // Check if error response is available, fallback to error message
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);


// Update an existing photo session by ID
export const updatePhotoSession = createAsyncThunk(
  'photoSessions/update',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://visible-gain-dashboard.onrender.com/photoSession/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("Error updating photo session:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// Delete a photo session by ID
export const deletePhotoSession = createAsyncThunk(
  'photoSessions/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://visible-gain-dashboard.onrender.com/photoSession/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.toJSON() || error.message);
    }
  }
);

// Initial state
const initialState = {
  sessions: [],

  selectedSession: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  successMessage: null,
};

// Slice definition
const photoSessionSlice = createSlice({
  name: 'photoSessions',
  initialState,
  reducers: {
    resetSelectedSession: (state) => {
      state.selectedSession = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null; // Clear the success message
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all sessions
      .addCase(fetchPhotoSessions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPhotoSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPhotoSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch session by ID
      .addCase(fetchPhotoSessionById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPhotoSessionById.fulfilled, (state, action) => {
        state.selectedSession = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPhotoSessionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create session
      .addCase(createPhotoSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.successMessage = null; // Reset success message on new request
      })
      .addCase(createPhotoSession.fulfilled, (state, action) => {
        state.sessions.push(action.payload.data);
        state.status = 'succeeded';
        state.successMessage = action.payload.message; // Set success message from backend
      })
      .addCase(createPhotoSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update session
      .addCase(updatePhotoSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePhotoSession.fulfilled, (state, action) => {
        console.log("Update succeeded with data:", action.payload); // Log the payload
        const index = state.sessions.findIndex((s) => s.sessionId === action.payload.sessionId);
        if (index !== -1) {
          state.sessions[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updatePhotoSession.rejected, (state, action) => {
        console.error("Update failed with error:", action.payload); // Log the error
        state.status = 'failed';
        state.error = action.payload;
      })
      

      // Delete session
      .addCase(deletePhotoSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePhotoSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s.sessionId !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deletePhotoSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      
  },
});

// Export actions and reducer
export const { resetSelectedSession, clearError,clearSuccessMessage } = photoSessionSlice.actions;
export default photoSessionSlice.reducer;
