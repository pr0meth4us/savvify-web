import React from 'react';

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-helm-navy font-display tracking-tight sm:text-6xl">
                    Helm
                </h1>
                <p className="mt-4 text-lg leading-8 text-helm-ocean">
                    Steer toward digital.
                </p>
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-helm-navy font-display">
                        Savvify by Helm
                    </h2>
                    <p className="mt-2 text-md text-helm-ocean">
                        Navigate your financial course. The foundation is set.
                    </p>
                </div>
            </div>
        </main>
    );
}