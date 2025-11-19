import { Button } from '@/components/ui/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import Link from 'next/link';
import React from 'react';

// Simple icons for features
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

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="bg-white py-24 sm:py-32">
                <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl font-extrabold tracking-tight text-helm-navy sm:text-6xl">
                        Steer toward financial clarity.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-helm-ocean">
                        Savvify by Helm is your personal finance navigator, helping you chart
                        your financial course directly from Telegram.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button variant="primary" size="lg" asChild>
                            <Link href="/signup">Start Navigating</Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/pricing">View Your Course</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Feature Showcase */}
            <section id="features" className="py-24 sm:py-32">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-helm-navy sm:text-4xl">
                            Navigate your finances, simplified.
                        </h2>
                        <p className="mt-4 text-lg text-helm-ocean">
                            All the tools you need to find your financial bearing.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                        <FeatureCard
                            title="Chat-Based Tracking"
                            description="Log transactions in seconds using natural language in Telegram."
                        />
                        <FeatureCard
                            title="Multi-Currency Compass"
                            description="Navigate multiple currencies (USD, KHR, THB) with live or fixed rates."
                        />
                        <FeatureCard
                            title="IOU Debt Charting"
                            description="Track money lent and borrowed so you always know your true position."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({
                         title,
                         description,
                     }: {
    title: string;
    description: string;
}) {
    return (
        <Card>
            <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-helm-seafoam">
                    <CheckIcon className="h-6 w-6 text-helm-navy" />
                </div>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    );
}