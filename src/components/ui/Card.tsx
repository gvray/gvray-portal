"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const cardVariants = cva(
  "card relative flex flex-col rounded-2xl border border-border/50 bg-bg-card/60 p-5 backdrop-blur-sm transition-all",
  {
    variants: {
      interactive: {
        true: "hover:-translate-y-1 hover:border-accent/30 hover:bg-bg-card/80 hover:shadow-lg",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
);

export interface CardProps
  extends VariantProps<typeof cardVariants>,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: "div" | "a";
  children: ReactNode;
}

export default function Card({
  interactive,
  as: Tag = "div",
  className,
  children,
  ...rest
}: CardProps) {
  const classes = cn(cardVariants({ interactive }), className);

  if (Tag === "a") {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}
