import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-[var(--radius)] border border-input bg-card px-[13px] py-[11px] font-sans text-[14px] leading-[1.5] text-foreground outline-none resize-y transition-[color,box-shadow,border-color]",
        "placeholder:text-muted-foreground",
        "focus:border-ring focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ring)_22%,transparent)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
