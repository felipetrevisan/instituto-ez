import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        outline:
          "border border-input bg-background shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        whatsapp:
          "bg-success border-2 border-white text-white font-bold hover:bg-white hover:text-success hover:border-white outline outline-2 outline-success hover:outline-white hover:border-success",
        icon: "bg-primary-foreground border-2 border-white text-white font-bold hover:bg-white hover:text-primary-foreground hover:border-primary-foreground outline outline-2 outline-primary-foreground hover:outline-white hover:border-primary-foreground",
      },
      theme: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 outline outline-2 outline-primary",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80 outline outline-2 outline-secondary",
        tertiary:
          "bg-tertiary text-tertiary-foreground shadow hover:bg-tertiary/80 outline outline-2 outline-tertiary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        xl: "h-14 text-md px-6",
        "2xl": "h-16 text-lg px-8",
      },
      icon: {
        true: "size-9 p-0",
      },
      rounded: {
        none: "rounded-none",
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-2xl",
        "2xl": "rounded-3xl",
      },
      shadow: {
        true: "shadow-[-.2rem_.35rem]",
      },
      hover: {
        background: "",
        effect:
          "before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:[clip-path:polygon(50%_0%,50%_0%,50%_50%,50%_100%,50%_100%,50%_50%)] before:-z-[1] before:transition-all hover:before:[clip-path:polygon(25%_-70%,75%_-70%,120%_50%,75%_170%,25%_170%,-20%_50%)] before:duration-500",
      },
      inverted: {
        true: "",
      },
    },
    defaultVariants: {
      variant: "default",
      theme: "default",
      size: "default",
      rounded: "none",
      hover: "background",
      shadow: false,
      icon: false,
    },
    compoundVariants: [
      {
        icon: true,
        size: "default",
        className: "size-7",
      },
      {
        icon: true,
        size: "sm",
        className: "size-6",
      },
      {
        icon: true,
        size: "lg",
        className: "size-7",
      },
      {
        icon: true,
        size: "xl",
        className: "size-10",
      },
      {
        icon: true,
        size: "2xl",
        className: "size-12",
      },
      {
        variant: "outline",
        theme: "default",
        className:
          "bg-white/60 hover:bg-primary hover:text-primary-foreground outline-primary-foreground",
      },
      {
        hover: "effect",
        variant: "default",
        theme: "default",
        className: "transition-all ease-in-out duration-500 before:bg-accent hover:text-primary",
      },
      {
        hover: "effect",
        variant: "outline",
        theme: "default",
        className:
          "transition-all ease-in-out duration-500 before:bg-primary-foreground hover:text-primary",
      },
      {
        hover: "effect",
        variant: "default",
        theme: "secondary",
        className: "transition-all ease-in-out duration-500 before:bg-accent hover:text-secondary",
      },

      // Primary
      {
        shadow: true,
        variant: "default",
        theme: "default",
        className:
          "shadow-primary/40 hover:shadow-black transition-shadow ease-in-out duration-500",
      },
      {
        shadow: true,
        variant: "default",
        theme: "default",
        inverted: true,
        className:
          "bg-primary-foreground text-primary shadow-primary/40 hover:shadow-black transition-shadow ease-in-out duration-500",
      },
      {
        shadow: false,
        variant: "default",
        theme: "default",
        inverted: true,
        className:
          "bg-primary-foreground text-primary hover:text-primary-foreground hover:bg-primary outline-primary-foreground",
      },

      // Secondary
      {
        shadow: true,
        variant: "default",
        theme: "secondary",
        className:
          "shadow-secondary/40 hover:shadow-black transition-shadow ease-in-out duration-500",
      },
      {
        shadow: true,
        variant: "default",
        theme: "secondary",
        inverted: true,
        className:
          "bg-secondary-foreground text-secondary shadow-secondary/40 hover:shadow-black transition-shadow ease-in-out duration-500",
      },
      {
        shadow: false,
        variant: "default",
        theme: "secondary",
        inverted: true,
        className: "bg-secondary-foreground text-secondary",
      },

      //Tertiary
      {
        shadow: true,
        variant: "default",
        theme: "tertiary",
        className:
          "shadow-tertiary/40 hover:shadow-black transition-shadow ease-in-out duration-500",
      },
      {
        shadow: true,
        variant: "default",
        theme: "tertiary",
        inverted: true,
        className:
          "bg-tertiary-foreground text-tertiary shadow-tertiary/40 hover:shadow-black transition-shadow ease-in-out duration-500",
      },
      {
        shadow: false,
        variant: "default",
        theme: "tertiary",
        inverted: true,
        className:
          "bg-tertiary-foreground text-tertiary hover:bg-tertiary hover:text-tertiary-foreground",
      },

      {
        shadow: true,
        variant: "outline",
        className:
          "shadow-secondary/40 hover:shadow-black transition-shadow ease-in-out duration-500",
      },
    ],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, theme, size, rounded, hover, icon, shadow, inverted, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, theme, size, rounded, hover, icon, shadow, inverted, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
