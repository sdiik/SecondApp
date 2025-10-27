import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
    async setItem(key: string, value: unknown) {
        try {
            const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
            await AsyncStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error setting item in storage:', error);
        }
    }

    async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value == null) {
                return null;
            }
            try {
                return JSON.parse(value) as T;
            } catch {
                return value as unknown as T;
            }
        } catch (error) {
            console.error('Error getting item from storage:', error);
            return null;
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from storage:', error);
        }
    }

    async clearAll(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
}

export const storage = new StorageService();