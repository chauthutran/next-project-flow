'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { IUserDTO } from '@/types/user';
import axios from 'axios';

interface AuthContextProps {
    user: IUserDTO | null;
    loading: boolean;
    error: string | null;

    login: (credentials: { email: string; password: string }) => Promise<void>;
    register: (user: IUserDTO) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: false,
    error: null,

    login: async () => {},
    register: async () => {},
    logout: async () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load user from token in cookies if any
    const loadUser = async () => {
            try {
                const res = await axios.get('/api/auth/me'); // endpoint reads token from cookie
                setUser(res.data.data);
            } catch (err: any) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        
    // Load user from token cookie on mount
    useEffect(() => {
        loadUser();
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/auth/login', credentials);
            setUser(response.data.data);
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await axios.post('/api/auth/logout'); // optional: clear cookie on server
        setUser(null);
        window.location.href = '/'; // redirect to login page
    };

    const register = async (payload: IUserDTO) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/auth/register', payload);
            setUser(response.data.data);
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
