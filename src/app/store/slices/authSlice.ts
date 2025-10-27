import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage, StorageKeys } from '../../storage';

interface AuthState {
    generalToken: string | null;
    userToken: string | null;
    isLogginIn: boolean
}

const initialState: AuthState = {
    generalToken: null,
    userToken: null,
    isLogginIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setGenerateToken(state, action: PayloadAction<string>) {
            state.generalToken = action.payload;
            storage.setItem(StorageKeys.GENERAL_TOKEN, action.payload);
        },
        setUserToken(state, action: PayloadAction<string>) {
            state.userToken = action.payload;
            state.isLogginIn = true;
            storage.setItem(StorageKeys.USER_TOKEN, action.payload);
            storage.setItem(StorageKeys.IS_LOGGED_IN, 'true');
        },
        logout(state) {
            state.generalToken = null;
            state.userToken = null;
            state.isLogginIn = false;

            storage.removeItem(StorageKeys.USER_TOKEN);
            storage.removeItem(StorageKeys.IS_LOGGED_IN);
            storage.removeItem(StorageKeys.GENERAL_TOKEN);
        },
        restoreSession(state, action: PayloadAction<Partial<AuthState>>) {
            const { generalToken, userToken, isLogginIn } = action.payload;
            if (generalToken) {
                state.generalToken = generalToken;
            }
            if (userToken) {
                state.userToken = userToken;
            }
            state.isLogginIn = isLogginIn ?? false;
            
        }
    },
});

export const { setGenerateToken, setUserToken, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;