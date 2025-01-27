import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";
import { TUser } from "@/types/TUser";

export interface UsersResponse {
  message: string;
  data: TUser[];
  page: number;
  total_pages: number;
  total_courses: number;
}

export const getUserQuery = async (id: string) => {
  const { data } = await api.get<UsersResponse>(`${ENDPOINTS.users}/${id}`);
  return data;
};
