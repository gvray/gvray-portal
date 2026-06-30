"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const iconButtonVariants = cva(
  "icon-button relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card/50 text-text-secondary transition-all hover:border-accent hover:text-accent",
  {
    variants: {
      glow: {
        true: "hover:shadow-[0_0_15px_var(--accent-glow)]",
        false: "",
      },
    },
    defaultVariants: {
      glow: false,
    },
  },
);

interface IconButtonBaseProps extends VariantProps<typeof iconButtonVariants> {
  srLabel?: string;
  className?: string;
  children: ReactNode;
}

interface IconButtonAsButtonProps extends IconButtonBaseProps {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

interface IconButtonAsAnchorProps extends IconButtonBaseProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
}

type IconButtonProps = IconButtonAsButtonProps | IconButtonAsAnchorProps;

export default function IconButton(props: IconButtonProps) {
  const { as: Tag = "button", srLabel, glow, className, children } = props;

  const classes = cn(iconButtonVariants({ glow }), className);

  if (Tag === "a") {
    const { href, target, rel } = props as IconButtonAsAnchorProps;
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {srLabel && <span className="sr-only">{srLabel}</span>}
        {children}
      </a>
    );
  }

  const { onClick, type = "button" } = props as IconButtonAsButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={srLabel}
    >
      {children}
    </button>
  );
}
