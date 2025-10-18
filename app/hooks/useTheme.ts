// hooks/useTheme.ts
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useEffect, useState } from 'react';

// type ITheme = 'light' | 'dark';

export function useTheme() {
     const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
    
    // const [theme, setTheme] = useState<ITheme>('light');

    // useEffect(() => {
    //     // Load from localStorage OR system preference
    //     const stored = localStorage.getItem('theme') as ITheme | null;
    //     if (stored) {
    //         setTheme(stored);
    //     } else {
    //         const prefersDark = window.matchMedia(
    //             '(prefers-color-scheme: dark)'
    //         ).matches;
    //         setTheme(prefersDark ? 'dark' : 'light');
    //     }
    // }, []);

    // useEffect(() => {
    //     // Apply theme class on <html>
    //     const root = document.documentElement;
    //     root.classList.remove('theme-light', 'theme-dark');
    //     root.classList.add(`theme-${theme}`);

    //     // Save preference
    //     localStorage.setItem('theme', theme);
    // }, [theme]);

    // const toggleTheme = () => {
    //     setTheme(theme === 'light' ? 'dark' : 'light');
    // };

    // return { theme, toggleTheme };
}
