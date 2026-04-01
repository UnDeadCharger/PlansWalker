import type { AsyncState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "./types";
import { fetchUsersApi } from "./usersApi";

// Async thunk
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await fetchUsersApi();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch users");
  }
});

// Slice
interface UsersState extends AsyncState<User[]> {}

const initialState: UsersState = {
  data: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
