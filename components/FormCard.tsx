"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface FormCardProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function FormCard({ title, subtitle, children, footer, className }: FormCardProps) {
  return (
    <div
      className={clsx(
        "relative w-full max-w-5xl rounded-[32px] px-6 sm:px-10 py-8 sm:py-10",
        "bg-gradient-to-b from-[#FF00FC] to-[#990097]",
        "shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/5",
        className
      )}
    >
      <div className="flex flex-col gap-3 mb-6">
        <h2
          className="font-sugar text-white text-[32px] sm:text-[40px] leading-none drop-shadow-[0_0_10px_rgba(0,0,0,0.55)] mb-[10px]"
          style={{ textShadow: "0 3px 0 #000" }}
        >
          {title}
        </h2>
        {subtitle ? (
          <div className="text-white font-montserrat text-xs sm:text-sm leading-relaxed uppercase tracking-wide">
            {subtitle}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">{children}</div>

      {footer ? <div className="mt-8">{footer}</div> : null}
    </div>
  );
}

export default FormCard;
