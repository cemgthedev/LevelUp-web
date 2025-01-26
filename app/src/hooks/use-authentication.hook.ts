import { AuthenticationContext } from "@/providers/Authentication.provider";
import { useContext } from "react";

export const useAuthentication = () => useContext(AuthenticationContext);