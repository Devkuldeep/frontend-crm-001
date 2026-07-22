import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-surface hover:bg-primary/80",
        secondary:
          "border-transparent bg-primary-light text-primary-dark hover:bg-primary-light/80",
        destructive:
          "border-transparent bg-danger text-surface hover:bg-danger/80",
        outline: "text-text-primary",
        success: "border-transparent bg-success text-surface hover:bg-success/80",
        warning: "border-transparent bg-warning text-surface hover:bg-warning/80",
        ai: "border-transparent bg-ai-accent text-surface hover:bg-ai-accent/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
