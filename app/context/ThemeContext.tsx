'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(`theme-${savedTheme}`);
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const defaultTheme = prefersDark ? 'dark' : 'light';

            setTheme(defaultTheme);
            document.documentElement.classList.add(`theme-${defaultTheme}`);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.classList.remove(`theme-${theme}`);
        document.documentElement.classList.add(`theme-${newTheme}`);

        localStorage.setItem('theme', newTheme);

        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
