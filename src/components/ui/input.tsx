import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-[40px] w-full rounded-[var(--radius)] border border-input bg-card px-[13px] font-sans text-[14px] text-foreground outline-none transition-[color,box-shadow,border-color]",
          "placeholder:text-muted-foreground",
          "focus:border-ring focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ring)_22%,transparent)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
