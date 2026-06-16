import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // CTA principal — accent de la section
        default: "bg-theme-accent text-theme-bg-primary hover:opacity-90",
        // Bouton sur surface claire (chip de nav)
        secondary: "bg-theme-bg-secondary text-theme-text-secondary hover:opacity-90",
        outline:
          "border border-theme-text-primary/30 text-theme-text-primary hover:bg-theme-text-primary/10",
        ghost: "text-theme-text-primary hover:bg-theme-text-primary/10",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
