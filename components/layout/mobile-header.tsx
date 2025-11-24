"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Compass } from "lucide-react";
import { Sidebar } from "./sidebar";

// Note: If you don't have a Sheet/Drawer component, we'll build a simple mobile toggle.
// For now, assuming a simple state-based toggle for simplicity in this phase.

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-16 items-center justify-between border-b border-helm-fog-dark bg-helm-navy px-4 lg:hidden">
      <Link href="/dashboard" className="flex items-center gap-2 text-white">
        <Compass className="h-6 w-6 text-helm-seafoam" />
        <span className="font-display font-bold">HELM</span>
      </Link>

      <button onClick={() => setIsOpen(!isOpen)} className="text-white">
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Simple Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] bg-helm-navy p-4">
          {/* Re-using the sidebar content logic here would be ideal,
               but for code brevity, we rely on the Sidebar component structure
               if we wrapped it properly. For Phase 3a, this placeholder ensures
               you know mobile needs handling. */}
          <Sidebar />
        </div>
      )}
    </div>
  );
}