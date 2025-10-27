export interface RegisterResponseModel { 
    diagnoctic: {
        status: string;
        message: string;
    };
    data: {
        id: string;
        name: string;
        email: string;
        photo: string,
        verified: boolean;
        createdAt: string;
        updatedAt: string;
    };
}