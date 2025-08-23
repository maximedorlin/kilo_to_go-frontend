"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

// Définir les variantes de couleurs disponibles
type CheckboxVariant = "primary" | "destructive" | "secondary" | "muted";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  variant?: CheckboxVariant;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = "primary", ...props }, ref) => {
  // Définir les classes en fonction de la variante de couleur
  const variantClasses = {
    primary:
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    destructive:
      "data-[state=checked]:bg-red-500 data-[state=checked]:text-white",
    secondary:
      "data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground",
    muted:
      "data-[state=checked]:bg-muted data-[state=checked]:text-muted-foreground",
  };

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant], // Appliquer les classes de la variante sélectionnée
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
