"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "badge inline-flex items-center gap-1.5 rounded-full font-medium",
  {
    variants: {
      variant: {
        default: "bg-accent/10 text-accent",
        outline: "border border-accent/20 bg-accent/5 text-accent",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[10px]",
        md: "px-3 py-1 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  color?: string;
}

export default function Badge({
  variant,
  size,
  color,
  className,
  children,
  style,
  ...rest
}: BadgeProps) {
  const dynamicStyle: React.CSSProperties = { ...style };
  if (color) {
    dynamicStyle.backgroundColor = `${color}15`;
    dynamicStyle.color = color;
    if (variant === "outline") {
      dynamicStyle.borderColor = `${color}33`;
      dynamicStyle.backgroundColor = `${color}0D`;
    }
  }

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      style={dynamicStyle}
      {...rest}
    >
      {children}
    </span>
  );
}
