import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      isIconOnly
      onClick={() => setTheme(theme === "light" ? "purple-dark" : "light")}
      variant="light"
      size="sm"
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
};