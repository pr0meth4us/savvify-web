"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";
import { Logo } from "@/components/ui/Logo";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:hidden sticky top-0 z-50">
      <Link href="/dashboard">
        <Logo className="w-8 h-8" textClassName="text-lg" />
      </Link>

      <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600 p-2">
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] bg-background">
          <Sidebar />
          {/* Note: You might want to modify Sidebar to accept a prop to remove the Logo
              if rendering inside mobile menu to avoid double logos, or just hide the top div via CSS */}
        </div>
      )}
    </div>
  );
}