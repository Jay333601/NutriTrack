import * as React from "react";

export type SpinningBorderButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SpinningBorderButton = React.forwardRef<
  HTMLButtonElement,
  SpinningBorderButtonProps
>(function SpinningBorderButton(
  { children = "Request Demo", className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]" +
        (className ? " " + className : "")
      }
      {...props}
    >
      <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ffffff_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-300 group-hover:opacity-0" />

      <span className="relative flex h-full w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-colors duration-300 group-hover:text-white">
        <span className="relative z-10">{children}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </button>
  );
});

SpinningBorderButton.displayName = "SpinningBorderButton";

export default SpinningBorderButton;
