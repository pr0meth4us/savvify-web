import Link from "next/link";
import { signOut } from "@/auth";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F7F9FC]">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-[#0A2540] text-white hidden md:flex flex-col fixed h-full z-50 shadow-xl">
                <div className="p-6 border-b border-[#1A3A5C]">
                    <h1 className="text-2xl font-bold tracking-wider">HELM</h1>
                    <p className="text-[#4ECDC4] text-xs uppercase tracking-widest mt-1">Financial Compass</p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-lg bg-[#1A3A5C] text-white border-l-4 border-[#4ECDC4]">
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/transactions" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-[#1A3A5C] hover:text-white transition-all">
                        <span className="font-medium">Transactions</span>
                    </Link>
                    <Link href="/debts" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-[#1A3A5C] hover:text-white transition-all">
                        <span className="font-medium">Debts & IOU</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-[#1A3A5C]">
                    <form action={async () => {
                        "use server"
                        await signOut({ redirectTo: "/login" })
                    }}>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                            <span className="mr-2">←</span> Disconnect
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}