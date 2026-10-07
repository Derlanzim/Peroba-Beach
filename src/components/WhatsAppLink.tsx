"use client";

import { track } from "../lib/analytics";

type Props = {
  href: string;
  local: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

export default function WhatsAppLink({ href, local, className, ariaLabel, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track("clique_whatsapp", { local })}
    >
      {children}
    </a>
  );
}
