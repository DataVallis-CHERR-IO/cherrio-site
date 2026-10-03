"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";

export function NavLinks() {
  const path = usePathname();
  return (
    <>
      {NAV.map((n) => {
        const active = path === n.href || path.startsWith(n.href + "/");
        return (
          <Link key={n.href} href={n.href} className={`s-navlink${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined}>
            {n.label}
          </Link>
        );
      })}
    </>
  );
}
