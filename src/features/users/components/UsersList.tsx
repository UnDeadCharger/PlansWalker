import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchUsers } from "../usersSlice";
import { UserCard } from "./UserCard";

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const { data: users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    void dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p className="font-semibold">Failed to load users</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500">No users found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
