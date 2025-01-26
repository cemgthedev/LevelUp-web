import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Navbar, NavbarContent } from "@nextui-org/react";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        id="header"
        isBordered
        className="w-full flex flex-row justify-between items-center border-collapse"
        classNames={{ wrapper: "w-full max-w-full" }}
      >
        <NavbarContent
          justify="end"
          className="w-fit flex flex-row gap-4 items-center "
        >
          <NavbarContent as="div" className="items-center" justify="end">
            <ThemeSwitcher />
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
    </div>
  );
};
