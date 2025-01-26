import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryProvider from "./reactQueryProvider";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <ReactQueryProvider>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark", "purple-dark"]}
        >
          <I18nProvider locale="pt-BR">
              {children}
          </I18nProvider>
          <ToastContainer />
        </NextThemesProvider>
      </NextUIProvider>
    </ReactQueryProvider>
  );
}