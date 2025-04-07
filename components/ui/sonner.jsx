"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "#0462c9",
        "--normal-text": "#ffffff",
        "--normal-border": "#0462c9",
      }}
      {...props}
    />
  );
}

export { Toaster }
