// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice'; // Ensure the path is correct
import photoSessionReducer from './photoSessionSlice'; // Correct this path
import usersReducer from './usersSlice'; // Changed the name for clarity

const store = configureStore({
    reducer: {
        auth: authReducer,               // Auth state
        photoSession: photoSessionReducer, // Photo session state
        users: usersReducer,             // Changed to 'users' for clarity
    },
});

export default store;
