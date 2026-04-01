import { apiClient } from "@/api/apiClient";
import type { User } from "./types";

export const fetchUsersApi = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/users");
  return response.data;
};

export const fetchUserByIdApi = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};
