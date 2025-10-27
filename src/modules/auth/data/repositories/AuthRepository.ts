import { apiAuth  } from "../../../../core/api/axiosInstance";
import { User } from "../../domain/entities/User";
import { RegisterResponseModel } from "../models/RegisterResponseModel";

export class AuthRepository {
    async getGenerateToken(clientId: string, clientSecret: string): Promise<string> {
        const response = await apiAuth.post('/auth/general', {
            clientId,
            clientSecret
        }, { skipAuth: true });
        return response.data.data.token;
    }

    async loginUser(email: string, password: string, deviceInfo: string, osInfo: string, fcmToken: string): Promise<string> {
        const response = await apiAuth.post('/auth/login', {
            email,
            password,
            deviceInfo,
            osInfo,
            fcmToken
        });
        return response.data.data.token;
    }

    async registerUser(name: string, email: string, password: string): Promise<User> {
        const response = await apiAuth.post<RegisterResponseModel>('/user', {
            name,
            email,
            password
        });
 
        const data = response.data.data;
        
        console.log('registerUser response data:', response.data.data);

        const user: User = {
            id: data.id,
            name: data.name,
            email: data.email,
            photo: data.photo,
            verified: data.verified,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };

        return user;
    }
}