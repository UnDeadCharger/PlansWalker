import { APP_NAME, ROUTES } from "@/constants";
import { Link } from "@tanstack/react-router";

export const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to {APP_NAME}</h1>
      <p className="max-w-md text-gray-500">
        A production-ready React template with TypeScript, Redux Toolkit, TanStack Router, Axios,
        Tailwind, Biome, and Jest.
      </p>
      <Link
        to={ROUTES.USERS}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        View Users →
      </Link>
    </div>
  );
};
