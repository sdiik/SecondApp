import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import { RegisterViewModel } from '../viewModel/registerViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../../../../styles/commonStyles';
import InputField from '../../../../components/InputField';

const RegisterScreen = () => {
  const { name, setName, email, setEmail, password, setPassword, loading, handleRegister } = RegisterViewModel();

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title as TextStyle}>Register</Text>

        <Text style={commonStyles.welcomeText as TextStyle}>Create your account{'\n'}and start your journey!</Text>

        <InputField
          placeholder='Name'
          value={name}
          onChangeText={setName}
          keyboardType='default'
        />

        <InputField
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />

        <InputField
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[commonStyles.button, loading && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={commonStyles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;


