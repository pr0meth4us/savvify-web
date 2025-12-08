"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowRightLeft, CreditCard, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/ui/Logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
  { name: "Debts & IOUs", href: "/debts", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-zinc-100">
      {/* Brand Header */}
      <div className="flex h-20 items-center px-6">
        <Logo />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-50 text-indigo-600" // Matches the purple highlight in Image 2
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 mt-auto border-t border-zinc-100">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group flex w-full items-center rounded-lg px-3 py-3 text-sm font-medium text-zinc-500 hover:bg-zinc-50 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-zinc-400 group-hover:text-zinc-600" />
          Sign Out
        </button>
      </div>
    </div>
  );
}