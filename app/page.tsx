import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 text-slate-900">
            <h1 className="text-4xl font-bold mb-4 text-blue-900">Savvify</h1>
            <p className="text-xl mb-8 text-slate-600">Navigate your finances.</p>

            <div className="flex gap-4">
                <Link
                    href="/login"
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                    Login
                </Link>
                <Link
                    href="/dashboard"
                    className="px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                    Dashboard (Protected)
                </Link>
            </div>
        </main>
    );
}