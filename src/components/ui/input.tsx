import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, type, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Icon />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "bg-input/10 border-2 border-input/20 text-input font-light rounded-2xl text-sm shadow-sm placeholder:text-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-within:border-input/50 disabled:cursor-not-allowed disabled:opacity-50 block w-full p-2.5",
            {
              "ps-10": Icon,
            },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
