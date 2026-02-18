"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ThemeColor() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = React.useState(resolvedTheme);

  // Sync current theme with resolvedTheme whenever it changes
  React.useEffect(() => {
    setCurrentTheme(theme === "system" ? resolvedTheme : theme);
  }, [theme, resolvedTheme]);

  // Determine button styles based on the current theme
  const buttonStyles = currentTheme === "dark" ? "bg-black !text-white !border-white " : "!bg-white text-black";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`${buttonStyles} border transition-colors duration-300 rounded-full focus:border-none !w-5 !h-5 mt-1 mr-1`}
        >
          {currentTheme !== "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all text-black" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all text-white" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeColor;