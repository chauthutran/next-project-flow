import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import StoreProvider from './redux/StoreProvider';
import ErroBoundary from './ErrorBoundary';
import { AuthProvider } from './context/UserContext';
import { Toaster } from 'react-hot-toast';
import ProgressAppPage from './components/ProgressAppPage';
// import "nprogress/nprogress.css"; // Have to import this here to apply styles globally

export const runtime = "nodejs"; // 👈 Need to declare this for nprogress dependencies

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
                            {/* Ahow progress bar when a page is loading */}
                            <ProgressAppPage />
                            
                            <ErroBoundary>
                                <main className="">{children}</main>
                                <Toaster position="top-right" reverseOrder={false} />
                            </ErroBoundary>
                            <Footer />
                        </ThemeProvider>
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
