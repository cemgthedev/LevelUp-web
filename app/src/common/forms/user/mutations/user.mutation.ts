import { ENDPOINTS } from "@/constants/endpoints";

import { CreateUserFormData } from "@/common/forms/user/validations/register-user.schema";
import { api } from "@/services/api.service";
import { UpdateUserFormData } from "../validations/update-user.schema";

type TypeFormCreate = CreateUserFormData;
type TypeFormUpdate = UpdateUserFormData;

export const createUserMutation = async (user: TypeFormCreate) => {
  const { data } = await api.post(ENDPOINTS.users, {
    ...user,
  });

  return data;
};

export const updateUserMutation = async (user: TypeFormUpdate) => {
  const { data } = await api.put(`${ENDPOINTS.users}/${user.id}`, {
    ...user,
  });

  return data;
};

export const deleteUserMutation = async (id: number) => {
  const { data } = await api.delete(`${ENDPOINTS.users}/${id}`);

  return data;
};
