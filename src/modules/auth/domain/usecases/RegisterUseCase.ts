import { AuthRepository } from "../../data/repositories/AuthRepository";
import { store } from "../../../../app/store/store";
import { GenerateTokenUseCase } from "./GenerateTokenUseCase";
import { User } from "../entities/User";

export class RegisterUseCase {
    private authRepository: AuthRepository;
    private generateTokenUseCase: GenerateTokenUseCase;

    constructor(authRepository: AuthRepository, generateTokenUseCase: GenerateTokenUseCase) {
        this.authRepository = authRepository;
        this.generateTokenUseCase = generateTokenUseCase;
    }

    async execute(name: string, email: string, password: string): Promise<User> {
        await this.generateTokenUseCase.execute('apimock', 'apimock_secret');

        const user = await this.authRepository.registerUser(name, email, password);
        return user;
    }
}   