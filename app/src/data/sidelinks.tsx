import { URLS } from "@/constants/urls";
import {
  GraduationCapIcon,
  HandCoins,
  LayoutDashboardIcon,
} from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  permission?: string; //PermissionNameType;
  href: string;
  icon: JSX.Element;
  sub?: NavLink[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: URLS.dashboard,
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    title: "Meus Cursos",
    label: "",
    href: URLS.my_courses,
    icon: <GraduationCapIcon size={18} />,
  },
  {
    title: "Ordens",
    label: "",
    href: URLS.orders,
    icon: <HandCoins size={18} />,
  },
];
