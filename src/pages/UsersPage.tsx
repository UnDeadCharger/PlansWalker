import { ROUTES } from "@/constants";
import { UsersList } from "@/features/users/components/UsersList";
import { Link } from "@tanstack/react-router";

export const UsersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="mt-1 text-gray-500">Fetched from JSONPlaceholder via Axios + Redux</p>
          </div>
          <Link to={ROUTES.HOME} className="text-sm text-blue-600 hover:underline">
            ← Back home
          </Link>
        </div>
        <UsersList />
      </div>
    </div>
  );
};
