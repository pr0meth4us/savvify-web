"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ScrollText,
  Handshake,
  Settings,
  LogOut,
  Compass
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ScrollText },
  { name: "Debts / IOUs", href: "/debts", icon: Handshake },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-helm-navy text-white shadow-xl">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-helm-navy-light">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Compass className="h-8 w-8 text-helm-seafoam animate-pulse-slow" />
          <span className="text-xl font-bold font-display tracking-tight">HELM</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-helm-navy-light text-white shadow-sm ring-1 ring-white/10"
                  : "text-gray-300 hover:bg-helm-navy-light/50 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-helm-seafoam" : "text-gray-400 group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-helm-navy-light p-4">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-helm-navy-light hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
          Disconnect
        </button>
      </div>
    </div>
  );
}