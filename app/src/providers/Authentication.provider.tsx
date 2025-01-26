import { ACCESS_TOKEN } from "@/constants/tokens";
import { loginMutation } from "@/pages/Login/mutations/login.mutation";
import { TCredential } from "@/types/TCredential";
import { TUser } from "@/types/TUser";
import { cache } from "@/utils/cache.util";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useState } from "react";

interface AuthenticationContext {
  user: TUser | null | undefined;
  isLoading: boolean;

  setIsLoading(value: boolean): void;
}

export const AuthenticationContext = createContext<AuthenticationContext>(
  {} as AuthenticationContext
);

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const { data } = useQuery({
    queryKey: [ACCESS_TOKEN],
    queryFn: async () => {
      setIsLoading(true);
      const storage = cache.getValue(ACCESS_TOKEN);
      const credential: TCredential = JSON.parse(storage || "");
      const response = await loginMutation(credential);
      setIsLoading(false);

      return response;
    }
  })

  return (
    <AuthenticationContext.Provider
      value={{
        user: data,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
