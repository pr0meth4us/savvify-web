import React from 'react';
import { PublicHeader } from '@/components/ui/PublicHeader';
import { PublicFooter } from '@/components/ui/PublicFooter';

export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-helm-fog">
            <PublicHeader />
            <main className="flex-grow">{children}</main>
            <PublicFooter />
        </div>
    );
}