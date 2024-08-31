"use client";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

function LightDarkToggle({ className }) {
  const [isDark, setIsDark] = useState(true);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={className}
          onClick={() => {
            setIsDark((prev) => !prev);
            document.body.classList.toggle("dark");
          }}
          asChild
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </TooltipTrigger>
        <TooltipContent>
          {isDark ? <p>Enable Light Mode</p> : <p>Enable Dark Mode</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LightDarkToggle;
