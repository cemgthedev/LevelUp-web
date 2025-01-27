import { ENDPOINTS } from "@/constants/endpoints";

import { api } from "@/services/api.service";
import { CreateCourseFormData } from "../validations/create-form.schema";
import { UpdateCourseFormData } from "../validations/update-form.schema";

type TypeFormCreate = CreateCourseFormData;
type TypeFormUpdate = UpdateCourseFormData;

export const createCourseMutation = async (course: TypeFormCreate) => {
  const { data } = await api.post(ENDPOINTS.courses, {
    ...course,
  });

  return data;
};

export const updateCourseMutation = async (course: TypeFormUpdate) => {
  const { data } = await api.put(`${ENDPOINTS.courses}/${course.id}`, {
    ...course,
  });

  return data;
};

export const deleteCourseMutation = async (id: number) => {
  const { data } = await api.delete(`${ENDPOINTS.courses}/${id}`);
  return data;
};
