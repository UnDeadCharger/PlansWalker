import type { User } from "../types";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-medium">Company:</span> {user.company.name}
        </p>
        <p>
          <span className="font-medium">City:</span> {user.address.city}
        </p>
      </div>
    </div>
  );
};
