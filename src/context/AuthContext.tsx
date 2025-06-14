import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    password: string;
    remember: boolean;
}

interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    format: string;
    stars: string[];
}

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    openAuth: boolean;
    setOpenAuth: (open: boolean) => void;
    login: (email: string, password: string, remember: boolean) => Promise<boolean>;
    register: (email: string, password: string, remember: boolean) => Promise<boolean>;
    logout: () => void;
    deleteMovie: (movieId: number) => Movie[];
    addMovie: (movie: Omit<Movie, 'id'>) => Movie[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [openAuth, setOpenAuth] = useState(false);
    const isAdmin = user?.email === 'admin@example.com';

    useEffect(() => {
        const initialUsers: User[] = [
            {
                id: '1',
                email: 'test@example.com',
                password: 'Password123!',
                remember: true,
            },
            {
                id: '0',
                email: 'admin@example.com',
                password: 'Admin123!',
                remember: true,
            },
        ];
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(initialUsers));
            console.log('Initialized users in LocalStorage:', initialUsers);
        }

        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log('Loaded current user:', JSON.parse(storedUser));
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
            console.log('Login successful for:', email);
            return true;
        }
        console.log('Login failed for:', email);
        return false;
    };

    const register = async (email: string, password: string, remember: boolean): Promise<boolean> => {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some((u) => u.email === email)) {
            console.log('Registration failed: Email already exists:', email);
            return false;
        }
        const newUser: User = {
            id: Math.random().toString(36).slice(2),
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
        console.log('Registered new user:', newUser);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        console.log('User logged out');
    };

    const deleteMovie = (movieId: number): Movie[] => {
        const movies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        console.log(`Deleted movie with ID ${movieId}. Updated movies:`, updatedMovies);
        return updatedMovies;
    };

    const addMovie = (movie: Omit<Movie, 'id'>): Movie[] => {
        const movies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');
        const maxId = movies.length ? Math.max(...movies.map((m) => m.id)) : 0;
        const newId = Math.max(maxId + 1, 26);
        const newMovie: Movie = {
            id: newId,
            ...movie,
        };
        movies.push(newMovie);
        localStorage.setItem('movies', JSON.stringify(movies));
        console.log('Added new movie with ID', newId, ':', newMovie);
        return movies;
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, openAuth, setOpenAuth, login, register, logout, deleteMovie, addMovie }}>
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