import { Layout } from "@/components/structures/Layout";
import { ACCESS_TOKEN } from "@/constants/tokens";
import { URLS } from "@/constants/urls";
import { AuthenticationProvider } from "@/providers/Authentication.provider";
import { cache } from "@/utils/cache.util";
import { notify } from "@/utils/notify.util";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouterProps = {
  redirectPath?: string;
};

export const ProtectedRouter = ({
  redirectPath = URLS.login,
}: ProtectedRouterProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = cache.getValue(ACCESS_TOKEN);

    if (!token) {
      navigate(redirectPath);
      notify("Por favor, efetue o login...", { type: "info" });
    }
  }, []);

  return (
    <AuthenticationProvider>
      <Layout />
    </AuthenticationProvider>
  );
};
