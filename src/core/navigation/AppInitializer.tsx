import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storage, StorageKeys } from "../../app/storage";
import { restoreSession } from "../../app/store/slices/authSlice";
import AppNavigator from "./AppNavigator";
import { ActivityIndicator, View } from "react-native";

const AppInitializer = () => {
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const generalToken = await storage.getItem<string>(StorageKeys.GENERAL_TOKEN);
                const userToken = await storage.getItem<string>(StorageKeys.USER_TOKEN);
                const isLogginIn = await storage.getItem<boolean>(StorageKeys.IS_LOGGED_IN);
                
                dispatch(
                    restoreSession({
                            generalToken,
                            userToken,
                            isLogginIn: !!isLogginIn,
                        })
                    );
                
            } catch {
                console.error('Failed to restore session');
            } finally {
                setIsReady(true);
            }
        }

        initializeApp();
        
    }, [dispatch]);

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <AppNavigator />;

}

export default AppInitializer;