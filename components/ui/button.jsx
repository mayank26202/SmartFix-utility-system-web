import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-black font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#0462c9]",
  {
    variants: {
      variant: {
        default: "bg-[#087cfb] hover:bg-[#087cfb] text-black",
        outline: "border border-[#087cfb] hover:bg-[#087cfb] text-black",
        secondary: "bg-gray-300 hover:bg-gray-400 text-black",
        ghost: "hover:bg-[#087cfb] text-black",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5 text-sm",
        lg: "px-6 py-3 text-lg",
        icon: "size-10 flex items-center justify-center",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "full",
    },
  }
);

function Button({ className, variant, size, rounded, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
