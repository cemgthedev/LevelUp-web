import { BASE_API_URL } from "@/constants/envs";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_API_URL,
});

export { api };

