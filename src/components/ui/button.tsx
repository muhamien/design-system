import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium tracking-[.01em] rounded-[var(--radius)] border border-transparent cursor-pointer outline-none transition-[filter,background-color,border-color,box-shadow] duration-150 focus-visible:ring-[3px] focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-[.93]",
        secondary:
          "bg-secondary text-secondary-foreground border-border hover:bg-accent",
        outline:
          "bg-transparent text-foreground border-border hover:bg-accent hover:border-primary",
        ghost: "bg-transparent text-foreground hover:bg-accent",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-[.93]",
        link: "bg-transparent text-primary border-none underline underline-offset-[3px] hover:brightness-[.9]",
      },
      size: {
        default: "h-[38px] px-[18px] text-[13px]",
        sm: "h-[30px] px-[12px] text-[12px] gap-[7px]",
        lg: "h-[46px] px-[24px] text-[15px]",
        icon: "size-[38px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
