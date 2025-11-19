import Link from 'next/link';

export function PublicFooter() {
    return (
        <footer className="border-t border-helm-fog-dark bg-white">
            <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-helm-navy font-display">
                            Helm
                        </h2>
                        <p className="mt-1 text-sm text-helm-ocean">Steer toward digital.</p>
                        <p className="mt-4 text-xs text-helm-ocean/70">
                            &copy; {new Date().getFullYear()} Helm Digital Co. All rights
                            reserved.
                        </p>
                    </div>

                    {/* Nav Groups */}
                    <div className="flex gap-12">
                        <div>
                            <h3 className="font-display font-semibold text-helm-navy">
                                Product
                            </h3>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <Link
                                        href="/#features"
                                        className="text-sm text-helm-ocean hover:text-helm-navy"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pricing"
                                        className="text-sm text-helm-ocean hover:text-helm-navy"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-helm-navy">
                                Company
                            </h3>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <Link
                                        href="/trust"
                                        className="text-sm text-helm-ocean hover:text-helm-navy"
                                    >
                                        Trust Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-sm text-helm-ocean hover:text-helm-navy"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-sm text-helm-ocean hover:text-helm-navy"
                                    >
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