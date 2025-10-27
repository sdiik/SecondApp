import { AuthRepository } from "../../data/repositories/AuthRepository";
import { store } from "../../../../app/store/store";
import { setUserToken } from "../../../../app/store/slices/authSlice";
import { GenerateTokenUseCase } from "./GenerateTokenUseCase";

export class LoginUseCase {
    private authRepository: AuthRepository;
    private generateTokenUseCase: GenerateTokenUseCase;

    constructor(authRepository: AuthRepository, generateTokenUseCase: GenerateTokenUseCase) {
        this.authRepository = authRepository;
        this.generateTokenUseCase = generateTokenUseCase;
    }

    async execute(email: string, password: string, deviceInfo: string, osInfo: string, fcmToken: string): Promise<string> {
        await this.generateTokenUseCase.execute('apimock', 'apimock_secret');
        
        const token = await this.authRepository.loginUser(email, password, deviceInfo, osInfo, fcmToken);
        store.dispatch(setUserToken(token));
        return token;
    }
}