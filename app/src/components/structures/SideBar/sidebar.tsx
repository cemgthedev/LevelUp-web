import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Navbar } from "@/components/ui/navbar";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { sidelinks } from "@/data/sidelinks";
import { Button } from "@nextui-org/button";
import { ChevronLeftCircle, MenuIcon, X } from "lucide-react";
import { UserDropdown } from "../Header/UserDropdown";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  let allLinks = [...sidelinks];

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r 
        border-default-300 transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? "md:w-14" : "md:w-64"
        }`,
        className
      )}
    >
      <div className={navOpened ? "h-svh" : ""}>
        {/* Header */}
        <div className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4">
          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <X /> : <MenuIcon />}
          </Button>

          <div
            className={`flex items-center justify-center w-full ${
              !isCollapsed ? "gap-2" : ""
            }`}
          >
            {isCollapsed ? (
              <p className="text-xl font-semibold text-purple-600">LU</p>
            ) : (
              <p className="text-xl font-semibold text-purple-600">LevelUp</p>
            )}
          </div>

          <div className="flex md:hidden items-center justify-end gap-4">
            <ThemeSwitcher />
            <UserDropdown />
          </div>
        </div>
        {/* Navigation links */}
        <Navbar
          id="sidebar-menu"
          className={`z-40 h-full flex-1 overflow-auto ${
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={allLinks}
        />
        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          variant="flat"
          isIconOnly
          className="absolute -right-4 p-0 m-0 top-1/2 z-50 hidden rounded-full md:inline-flex"
        >
          <ChevronLeftCircle
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
    </aside>
  );
}
