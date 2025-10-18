import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import StoreProvider from './redux/StoreProvider';
import ErroBoundary from './ErrorBoundary';
import { AuthProvider } from './context/UserContext';

export const metadata: Metadata = {
    title: 'Project FlowMaster',
    description:
        'A comprehensive project management tool designed to streamline workflows'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-[var(--bg)] h-screen flex flex-col text-[var(--text)]">
                <StoreProvider>
                    <AuthProvider>
                        <ThemeProvider>
                            <Header />
                            <ErroBoundary>
                                <main className="">{children}</main>
                            </ErroBoundary>
                            <Footer />
                        </ThemeProvider>
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
