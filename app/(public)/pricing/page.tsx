import { Button } from '@/components/ui/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import Link from 'next/link';

// Re-using the check icon from the original
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075L4.152 12.348a.75.75 0 011.052-1.143l2.803 3.555 7.4-9.717a.75.75 0 011.052-.143z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const features = [
    'Natural language logging',
    'Multi-currency tracking',
    'Advanced IOU/Debt tracking',
    'Unlimited custom categories',
    'Advanced analytics & reports',
    'Full data export',
];

export default function PricingPage() {
    return (
        <div className="py-24 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="font-display text-4xl font-extrabold tracking-tight text-helm-navy sm:text-5xl">
                        Simple, transparent pricing.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-helm-ocean">
                        One plan, all features. Try Savvify free for one month, then
                        choose the plan that works for you.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-3xl lg:mx-auto">
                    {/* Monthly Plan */}
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Monthly</CardTitle>
                            <CardDescription>
                                All features, billed monthly.
                            </CardDescription>
                            <div className="pt-4">
                <span className="text-4xl font-bold text-helm-navy font-display">
                  $5
                </span>
                                <span className="text-helm-ocean"> / month</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <h3 className="font-semibold text-helm-navy mb-4">
                                Includes all features:
                            </h3>
                            <ul className="space-y-2 text-sm text-helm-ocean">
                                {features.map((feature) => (
                                    <FeatureItem key={feature}>{feature}</FeatureItem>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/signup">Start Your Free Trial</Link>
                            </Button>
                        </div>
                    </Card>

                    {/* Yearly Plan */}
                    <Card className="flex flex-col ring-2 ring-helm-seafoam relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-helm-seafoam px-3 py-1 text-sm font-semibold text-helm-navy">
                            Save 20%
                        </div>
                        <CardHeader>
                            <CardTitle>Yearly</CardTitle>
                            <CardDescription>
                                All features, billed annually.
                            </CardDescription>
                            <div className="pt-4">
                <span className="text-4xl font-bold text-helm-navy font-display">
                  $48
                </span>
                                <span className="text-helm-ocean"> / year</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <h3 className="font-semibold text-helm-navy mb-4">
                                Includes all features:
                            </h3>
                            <ul className="space-y-2 text-sm text-helm-ocean">
                                {features.map((feature) => (
                                    <FeatureItem key={feature}>{feature}</FeatureItem>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button variant="accent" className="w-full" asChild>
                                <Link href="/signup">Start Your Free Trial</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-helm-seafoam" />
            <span>{children}</span>
        </li>
    );
}