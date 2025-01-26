import { useEffect } from "react";
import useLocalCache from "./use-local-cache";
import { SIDEBAR_COLLAPSED_KEY } from "@/constants/tokens";

export default function useIsCollapsed() {
  const [isCollapsed, setIsCollapsed] = useLocalCache({
    key: SIDEBAR_COLLAPSED_KEY,
    defaultValue: false,
  });

  useEffect(() => {
    const handleResize = () => {
      // Update isCollapsed based on window.innerWidth
      setIsCollapsed(window.innerWidth < 768 ? false : isCollapsed);
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed, setIsCollapsed]);

  return [isCollapsed, setIsCollapsed] as const;
}
