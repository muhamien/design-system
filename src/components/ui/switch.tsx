import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border border-border bg-muted outline-none transition-colors",
      "focus-visible:ring-[3px] focus-visible:ring-ring/35",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none absolute left-[2px] top-[2px] size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.3)] transition-[left] duration-150 data-[state=checked]:left-[20px]" />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
