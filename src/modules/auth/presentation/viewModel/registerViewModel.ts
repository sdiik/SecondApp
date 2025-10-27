import { useState } from "react";
import { Alert } from "react-native";
import { LoginUseCase } from "../../domain/usecases/LoginUseCase";
import { RegisterUseCase } from "../../domain/usecases/RegisterUseCase";
import { AuthRepository } from "../../data/repositories/AuthRepository";
import { GenerateTokenUseCase } from "../../domain/usecases/GenerateTokenUseCase";


export const RegisterViewModel = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const authRepository = new AuthRepository();
    const generateTokenUseCase = new GenerateTokenUseCase(authRepository);
    const registerUseCase = new RegisterUseCase(authRepository, generateTokenUseCase);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please enter name, email, and password.');
            return;
        }

        try {
            setLoading(true);

            const user = await registerUseCase.execute(
                name,
                email,
                password
            );

            Alert.alert('✅ Registration Successful', `Welcome aboard! ${user.name}`);
        } catch (error: any) {
            Alert.alert('❌ Registration Failed', error.response?.data?.message || error.message || 'Unknown error occurred',);
        } finally {
            setLoading(false);
        }
    }

    return {
        name,
        email,
        password,
        loading,
        setName,
        setEmail,
        setPassword,
        handleRegister,
    };
}