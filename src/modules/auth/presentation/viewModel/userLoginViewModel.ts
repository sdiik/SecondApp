import { useState } from "react";
import { Alert } from "react-native";
import { LoginUseCase } from "../../domain/usecases/LoginUseCase";
import { AuthRepository } from "../../data/repositories/AuthRepository";
import { GenerateTokenUseCase } from "../../domain/usecases/GenerateTokenUseCase";

export const UserLoginViewModel = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const authRepository = new AuthRepository();
    const generateTokenUseCase = new GenerateTokenUseCase(authRepository);
    const loginUseCase = new LoginUseCase(authRepository, generateTokenUseCase);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        try {
            setLoading(true);

            await loginUseCase.execute(
                email,
                password,
                'iPhone 12',
                'iOS 18',
                'fcm_token_123'
            );

            Alert.alert('✅ Login Successful', 'Welcome back!');
        } catch (error: any) {
            Alert.alert('❌ Login Failed', error.response?.data?.message || error.message || 'Unknown error occurred',);
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        password,
        loading,
        setEmail,
        setPassword,
        handleLogin,
    };
}