import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Savvify
            </h2>
            <p className="mt-1 text-sm text-slate-500">Financial clarity for everyone.</p>
            <p className="mt-4 text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Helm Digital Co. All rights reserved.
            </p>
          </div>

          {/* Nav Groups */}
          <div className="flex gap-12">
            <div>
              <h3 className="font-semibold text-slate-900">Product</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/#features" className="text-sm text-slate-600 hover:text-slate-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-sm text-slate-600 hover:text-slate-900">
                    User Guide
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Company</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/trust" className="text-sm text-slate-600 hover:text-slate-900">
                    Trust Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}