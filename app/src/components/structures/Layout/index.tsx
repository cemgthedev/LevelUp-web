import useIsCollapsed from "@/hooks/use-is-collapsed";
import { SettingsProvider } from "@/providers/Settings.provider";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import Sidebar from "../SideBar/sidebar";

export const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <SettingsProvider>
      <div className="relative h-full overflow-hidden bg-background">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main
          id="content"
          className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
            isCollapsed ? "md:ml-14" : "md:ml-64"
          } h-full`}
        >
          <Card className="bg-transparent p-0 m-0" shadow="none">
            <CardHeader className="p-0 hidden md:flex">
              <Header />
            </CardHeader>

            <CardBody>
              <Outlet />
            </CardBody>
          </Card>
        </main>
      </div>
    </SettingsProvider>
  );
};
