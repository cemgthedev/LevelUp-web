import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";
import { TCredential } from "@/types/TCredential";
import { TUser } from "@/types/TUser";

type AuthenticationResponse = {
  message: string;
  data: TUser[];
  page: number;
  total_pages: number;
  total_users: number;
};

export const loginMutation = async (credential: TCredential) => {
  const {
    data: { data },
  } = await api.get<AuthenticationResponse>(ENDPOINTS.login, {
    params: credential,
  });

  return data[0];
};
