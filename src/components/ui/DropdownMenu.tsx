"use client";

export interface DropdownMenuItem {
  label: string;
  href: string;
  target?: string;
  rel?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownMenuItem[];
}

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex h-10 items-center gap-1 rounded-full border border-border bg-bg-card/50 px-4 text-sm font-medium text-text-secondary transition-all hover:border-accent hover:text-accent"
        aria-haspopup="true"
      >
        {label}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="invisible absolute right-0 top-full min-w-40 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-card/90 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.target}
              rel={item.rel}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-secondary hover:text-accent"
            >
              {item.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
