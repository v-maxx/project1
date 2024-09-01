import { configureStore } from '@reduxjs/toolkit'
import {AuthContext} from "@/lib/context/AuthContext";
import {useContext} from "react";
import {userSlice} from "@/redux/features/user/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAuth = () => useContext(AuthContext)
