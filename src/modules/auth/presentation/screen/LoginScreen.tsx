import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    TextStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../../../components/InputField';
import { UserLoginViewModel } from '../viewModel/userLoginViewModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store/store';
import { commonStyles } from '../../../../styles/commonStyles';
import { Colors, Spacing } from '../../../../app/theme';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../../core/navigation/types';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<AuthNavigationProp>();

    const { email, password, loading, setEmail, setPassword, handleLogin } = UserLoginViewModel();


    const isLogginIn = useSelector((state: RootState) => state.auth.isLogginIn);

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={commonStyles.container}>
                <Text style={commonStyles.title as TextStyle}>Login</Text>

                <Text style={commonStyles.welcomeText as TextStyle}>Welcome back! Glad{'\n'}to see you, Again!</Text>

                <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[commonStyles.button, loading && { opacity: 0.6 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={commonStyles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                {isLogginIn && (
                    <Text style={commonStyles.loggedInText}>✅ You are logged in</Text>
                )}

                <View style={{ flexDirection: 'row', marginTop: Spacing.sm, justifyContent: 'center' }}>
                    <Text style={{ color: Colors.text }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Register' as never);
                    }}>
                        <Text style={{ color: Colors.primary, fontWeight: '600' }}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
