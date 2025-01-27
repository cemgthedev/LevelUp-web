import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";
import { TCourse } from "@/types/TCourse";

export interface CoursesResponse {
  message: string;
  data: TCourse[];
  page: number;
  total_pages: number;
  total_courses: number;
}

export interface IFilterCourses {
  seller_id?: number;
  title?: string;
  min_price?: number;
  max_price?: number;
  min_workload?: number;
  max_workload?: number;
}

export const getCoursesQuery = async (id: string) => {
  const { data } = await api.get(`${ENDPOINTS.courses}/${id}`);
  return data;
};

export const searchCourseQuery = async (filterProps?: IFilterCourses) => {
  const { data } = await api.get<CoursesResponse>(ENDPOINTS.courses, {
    params: {
      ...filterProps,
    },
  });

  return data;
};

export const queryKeysCourse = {
  get_list_courses: "get_list_courses",
  get_course: "get_course",
};
