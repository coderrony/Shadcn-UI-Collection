"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function MenuItem({ children, href }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`py-2 px-1 rounded block hover:bg-white dark:hover:bg-zinc-700 ${
          isActive && "bg-primary dark:hover:bg-primary"
        }`}
      >
        {" "}
        {children}
      </Link>
    </li>
  );
}

export default MenuItem;
