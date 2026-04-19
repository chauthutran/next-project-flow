// hooks/useTheme.ts
import { useEffect, useState } from 'react';
import { ITheme } from '../types/theme';


export function useTheme() {
    const [theme, setTheme] = useState<ITheme>('light');

    useEffect(() => {
        // Load from localStorage OR system preference
        const stored = localStorage.getItem('theme') as ITheme | null;
        if (stored) {
            setTheme(stored);
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        // Apply theme class on <html>
        const root = document.documentElement;
        root.classList.remove('theme-light', 'theme-dark');
        root.classList.add(`theme-${theme}`);

        // Save preference
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
}