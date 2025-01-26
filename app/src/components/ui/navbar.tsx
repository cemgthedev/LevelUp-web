import { URLS } from "@/constants/urls";
import { SideLink } from "@/data/sidelinks";

import useCheckActiveNav from "@/hooks/use-check-nav-active";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
}

const Navbar = ({ links, isCollapsed, className, closeNav }: NavProps) => {
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      );

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "group overflow-hidden border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none",
        className
      )}
    >
      <Tooltip>
        <nav className="grid gap-1 overflow-hidden group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(renderLink)}
        </nav>
      </Tooltip>
    </div>
  );
};

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        "h-12 flex items-center text-wrap overflow-hidden rounded-none px-6 transition-colors duration-200 hover:scale-[1.02]", // Adicionando hover
        subLink && "h-10 w-full border-l border-l-slate-500 px-2"
      )}
      aria-current={
        checkActiveNav(`${URLS.dashboard}/${href}`) ? "page" : undefined
      }
    >
      <div className="mr-2 flex flex-row items-center gap-2 justify-start ">
        {icon}
        <h1>{title}</h1>
        {label && (
          <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
            {label}
          </div>
        )}
      </div>
    </Link>
  );
}

function NavLinkDropdown({
  title,
  icon,
  label,
  sub,
  closeNav,
}: NavLinkProps | any) {
  const { checkActiveNav } = useCheckActiveNav();

  const isChildActive = sub?.find((s: any) =>
    checkActiveNav(`${URLS.dashboard}/${s.href}`)
  );

  return (
    <Accordion isCompact className="pl-6">
      <AccordionItem
        key={title}
        classNames={{
          trigger: cn(
            isChildActive ? "border-b" : "bg-ghost",
            "hover:border-b hover:scale-[1.02] active:scale-[0.98] transition-transform overflow-hidden"
          ),
        }}
        indicator={<ChevronLeft className="text-default-400" />}
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon} {title}
              {label && (
                <span className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
                  {label}
                </span>
              )}
            </div>
          </div>
        }
      >
        <ul className="mt-2 flex flex-col gap-1 overflow-hidden">
          {sub!.map((subLink: any) => (
            <li
              key={subLink.title}
              className={cn(
                checkActiveNav(`${URLS.dashboard}/${subLink.href}`)
                  ? "bg-default"
                  : "",
                "ml-2 flex items-center justify-center gap-2"
              )}
            >
              <NavLink
                {...subLink}
                subLink
                closeNav={closeNav}
                key={subLink.href}
              />
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip content={title} color="foreground">
      <Link
        to={href}
        className={cn(
          checkActiveNav(href) ? "bg-default " : "bg-ghost ",
          "h-12 w-12 flex items-center justify-center rounded-full"
        )}
      >
        {icon}
        {label && (
          <span className="sr-only">
            {label} - {title}
          </span>
        )}
      </Link>
    </Tooltip>
  );
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps | any) {
  const { checkActiveNav } = useCheckActiveNav();
  const isChildActive = sub?.find((s: any) =>
    checkActiveNav(`${URLS.dashboard}/${s.href}`)
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant={isChildActive ? "solid" : "light"}
          className={cn(
            isChildActive
              ? "bg-secondary text-white"
              : "bg-ghost text-gray-500",
            "h-12 w-12 flex items-center justify-center rounded-full"
          )}
        >
          {icon}
          <Tooltip content={title} color="foreground">
            {label && <span className="sr-only">{label}</span>}
          </Tooltip>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Submenu"
        variant="flat"
        className="w-48 shadow-lg"
      >
        {sub!.map(({ title, icon, label, href }: any) => (
          <DropdownItem key={href}>
            <Link
              to={href}
              className={`flex items-center ${
                checkActiveNav(`${URLS.dashboard}/${href}`)
                  ? "bg-secondary text-white"
                  : ""
              }`}
            >
              {icon}
              <span className="ml-2">{title}</span>
              {label && <span className="ml-auto text-sm">{label}</span>}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export { Navbar };
