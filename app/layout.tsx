import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';

// Configure fonts
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const metadata = {
    title: 'Savvify by Helm - Navigate Your Finances',
    description: 'Steer toward digital financial clarity with Savvify by Helm.',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${montserrat.variable} h-full`}
        >
        <body className="h-full antialiased">
        {/* AuthProvider wraps the entire application */}
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    );
}