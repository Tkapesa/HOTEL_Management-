import { useState, useEffect } from 'react';
import authService from '../services/auth.service';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthResponse {
    data: {
        user: User;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    };
}

interface RegisterUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser?.user || null);
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await authService.login(email, password);
            setUser(response.data?.user || null);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = (): void => {
        authService.logout();
        setUser(null);
    };

    const register = async (userData: RegisterUserData): Promise<AuthResponse> => {
        try {
            const response = await authService.register(
                userData.firstName, 
                userData.lastName, 
                userData.email, 
                userData.password
            );
            setUser(response.data?.user || null);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user
    };
};

export default useAuth;