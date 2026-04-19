'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/app/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { getAvatarColor } from '../lib/utils';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const { user, logout } = useAuth();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenProfileMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [pathname]);
    
    const handleLogout = () => {
        const ok = confirm('are you sure you want to logout ?');
        if (ok) {
            logout();
            router.push('/');
        }
    };

    // Show only title for login page
    if (pathname === '/') {
        return null;
    }

    if (!user) return <div>Loading ...</div>;
    
    return (
        <header className="flex items-center justify-between px-6 py-3 border-b bg-[var(--card)] border-[var(--border)] ">
            {/* Left Section - Logo / Title */}
            <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-[var(--icon-text)] font-bold shadow-sm">
                    PM
                </div>
                <h1 className="text-lg font-semibold text-[var(--text)]">
                    Project FlowMaster
                </h1>
            </div>

            {/* Middle Section - Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-[var(--text)] font-medium">
                <Link
                    href="/pages/dashboard"
                    className="hover:text-[var(--primary)] transition"
                >
                    Dashboard
                </Link>
                <Link
                    href="/pages/projects"
                    className="hover:text-[var(--primary)] transition"
                >
                    Projects
                </Link>
                <Link
                    href="/pages/teams"
                    className="hover:text-[var(--primary)] transition"
                >
                    Teams
                </Link>
                <Link
                    href="/pages/reports"
                    className="hover:text-[var(--primary)] transition"
                >
                    Reports
                </Link>
                <Link
                    href="/pages/calendar"
                    className="hover:text-[var(--primary)] transition"
                >
                    Calendar
                </Link>
            </nav>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-4">
                {/* Search bar */}
                <div className="hidden lg:flex items-center bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm text-[var(--text)] placeholder-[var(--muted)]"
                    />
                </div>

                {/* User avatar */}
                <div 
                    className="w-9 h-9 rounded-full text-[var(--primary-text)] flex items-center justify-center font-semibold cursor-pointer"
                    onClick={() => setOpenProfileMenu((prev) => !prev)}
                    style={{ backgroundColor: getAvatarColor(user!.email).bg, color: getAvatarColor(user!.email).text }}
                >
                    {user!.email.charAt(0).toUpperCase()}
                </div>
            </div>
            
            {/* Dropdown */}
            {openProfileMenu && (
                <div ref={menuRef} className="absolute right-0 top-12 w-44 bg-[var(--card)] border border-[var(--card-border)] rounded-xl shadow-lg z-50">
                    <button 
                        className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-hover)] transition"
                        onClick={() => setOpenProfileMenu(false)}
                    >
                       <Link
                            href="/pages/profile"
                            className="hover:text-[var(--primary)] transition"
                        >
                            Profile
                        </Link>
                    </button>
                    <button 
                        className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-hover)] transition"
                        onClick={toggleTheme}
                    >
                        {/* (Dark / Light mode) */}
                        Toggle Theme
                    </button>
                    <button 
                        className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-hover)] transition"
                        onClick={toggleTheme}
                    >
                        <Link
                            href="/pages/about-us"
                            className="hover:text-[var(--primary)] transition"
                        >
                            About Us
                        </Link>
                    </button>
                    
                    <hr />
                    
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-hover)] transition">
                        <Link
                            href="/pages/change-password"
                            className="hover:text-[var(--primary)] transition"
                        >
                            Change Password
                        </Link>
                    </button>
                    <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-hover)] transition text-[var(--accent)]"
                        onClick={handleLogout}
                    >
                    Logout
                </button>
                </div>
            )}
        </header>
    );
}
