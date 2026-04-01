import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";

import { UsersList } from "../components/UsersList";
import * as usersApi from "../usersApi"; // import as namespace so jest.spyOn can intercept it
import { usersReducer } from "../usersSlice";

import type { User } from "../types";

// ─── Mock Data ───────────────────────────────────────────────────────────────
// Fake user that mimics the shape of a real API response.
// Used across multiple tests to avoid repeating the same object.
const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Smith",
    username: "alice",
    email: "alice@example.com",
    phone: "123-456-7890",
    website: "alice.dev",
    address: { street: "1 Main St", suite: "Apt 1", city: "Townsville", zipcode: "12345" },
    company: { name: "Acme Corp" },
  },
];

// ─── Test Helper ─────────────────────────────────────────────────────────────
// Wraps the component in a real Redux store so it can read and dispatch state.
// We don't pass preloadedState here — the store starts empty and the thunk
// runs for real, which is the whole point of these tests.
const renderWithStore = () => {
  const store = configureStore({ reducer: { users: usersReducer } });
  return render(
    <Provider store={store}>
      <UsersList />
    </Provider>
  );
};

// ─── Tests ───────────────────────────────────────────────────────────────────
describe("UsersList", () => {
  it("shows a loading spinner while fetching", () => {
    // jest.spyOn replaces fetchUsersApi with a fake version for this test only.
    // new Promise(() => {}) is a promise that never resolves or rejects —
    // it freezes the thunk mid-flight, keeping loading: true indefinitely.
    // This lets us assert the loading state without waiting for anything.
    jest.spyOn(usersApi, "fetchUsersApi").mockReturnValue(new Promise(() => {}));
    renderWithStore();

    // No need for waitFor here — the spinner is visible immediately on mount
    // before the async thunk has a chance to complete.
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("shows an error message on failure", async () => {
    // mockRejectedValue simulates a failed API call (e.g. network error, 500).
    // The thunk catches this and dispatches the rejected action,
    // which sets error: "Network error" in the Redux store.
    jest.spyOn(usersApi, "fetchUsersApi").mockRejectedValue(new Error("Network error"));
    renderWithStore();

    // waitFor retries the assertions on every DOM update until they pass
    // or the timeout is hit (default 1000ms). We need it because the thunk
    // is async — the error state only appears after the promise rejects
    // and Redux re-renders the component.
    await waitFor(() => {
      expect(screen.getByText("Failed to load users")).toBeInTheDocument();
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });

  it("renders user cards when data is available", async () => {
    // mockResolvedValue simulates a successful API call returning our fake users.
    // The thunk dispatches the fulfilled action, setting data: mockUsers in the store.
    jest.spyOn(usersApi, "fetchUsersApi").mockResolvedValue(mockUsers);
    renderWithStore();

    // Again we waitFor because the component starts in loading state,
    // then re-renders once the thunk resolves with data.
    await waitFor(() => {
      expect(screen.getByText("Alice Smith")).toBeInTheDocument();
      expect(screen.getByText("@alice")).toBeInTheDocument();
      expect(screen.getByText(/Acme Corp/)).toBeInTheDocument(); // regex match — more flexible
    });
  });

  it("shows empty state when users list is empty", async () => {
    // Same as above but returns an empty array —
    // tests the branch where the API succeeds but has no data.
    jest.spyOn(usersApi, "fetchUsersApi").mockResolvedValue([]);
    renderWithStore();

    await waitFor(() => {
      expect(screen.getByText("No users found.")).toBeInTheDocument();
    });
  });

  // ─── Cleanup ───────────────────────────────────────────────────────────────
  // Runs after every single test in this describe block.
  // restoreAllMocks undoes every jest.spyOn so the real fetchUsersApi
  // is back in place before the next test runs — prevents test bleed.
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
