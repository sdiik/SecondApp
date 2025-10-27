import { AuthRepository } from "../../data/repositories/AuthRepository";
import { store } from "../../../../app/store/store";
import { setGenerateToken } from "../../../../app/store/slices/authSlice";

export class GenerateTokenUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(clientId: string, clientSecret: string): Promise<string> {
        const token = await this.authRepository.getGenerateToken(clientId, clientSecret);
        store.dispatch(setGenerateToken(token));
        return token;
    }
}