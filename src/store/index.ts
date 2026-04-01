import { useDispatch, useSelector } from "react-redux";

import { usersReducer } from "@/features/users/usersSlice";
import { configureStore } from "@reduxjs/toolkit";

import type { TypedUseSelectorHook } from "react-redux";
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
