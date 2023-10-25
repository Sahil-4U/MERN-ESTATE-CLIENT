import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (stage) => {
            stage.loading = true
        },
        signInSuccess: (stage, action) => {
            stage.currentUser = action.payload;
            stage.loading = false;
            stage.error = null;
        },
        signInFailure: (stage, action) => {
            stage.error = action.payload;
            stage.loading = false;
        }
    }

});

export const { signInFailure, signInStart, signInSuccess } = UserSlice.actions;

export default UserSlice.reducer;