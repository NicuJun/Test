import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    openAuth: boolean;
    setOpenAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [openAuth, setOpenAuth] = useState(false);
    return (
        <AuthContext.Provider value={{ openAuth, setOpenAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}