import { ACCESS_TOKEN } from "@/constants/tokens";
import { cache } from "./cache.util";
import { notify } from "./notify.util";

export const logout = () => {
  cache.clearValue(ACCESS_TOKEN);
  notify("Sua sessão foi encerrada...", { type: "info" });
};