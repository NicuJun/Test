import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    password: string;
    remember: boolean;
}

interface AuthContextType {
    user: User | null;
    openAuth: boolean;
    setOpenAuth: (open: boolean) => void;
    login: (email: string, password: string, remember: boolean) => Promise<boolean>;
    register: (email: string, password: string, remember: boolean) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [openAuth, setOpenAuth] = useState(false);

    useEffect(() => {
        // Load user from LocalStorage on mount
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string, remember: boolean): Promise<boolean> => {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            if (remember) {
                localStorage.setItem('currentUser', JSON.stringify({ ...user, remember }));
            }
            setUser({ ...user, remember });
            setOpenAuth(false);
            return true;
        }
        return false;
    };

    const register = async (email: string, password: string, remember: boolean): Promise<boolean> => {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some((u) => u.email === email)) {
            return false; // Email already exists
        }
        const newUser: User = {
            id: Math.random().toString(36).slice(2), // Simple ID generation
            email,
            password,
            remember,
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        if (remember) {
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            setUser(newUser);
        }
        setOpenAuth(false);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ user, openAuth, setOpenAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};