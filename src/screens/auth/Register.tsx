import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { signUp } from '../../services/auth';
import { getAuthErrorMessage } from '../../utils/authErrorHandler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';

type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

export default function Register({ navigation }: RegisterScreenProps) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    global?: string;
  }>({});

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }
    try {
      await signUp(userName, password);
      Alert.alert(
        'Registration Successful',
        'You can now log in with your credentials.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
      );
    } catch (err: any) {
      const msg = getAuthErrorMessage(err.code);
      setFieldErrors(msg);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Username/Email"
          onChangeText={val => setUserName(val)}
          defaultValue={userName}
        />
        {fieldErrors.email && (
          <Text style={styles.errorText}>{fieldErrors.email}</Text>
        )}
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={val => setPassword(val)}
          defaultValue={password}
          secureTextEntry={true}
        />
        {fieldErrors.password && (
          <Text style={styles.errorText}>{fieldErrors.password}</Text>
        )}
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={val => setConfirmPassword(val)}
          defaultValue={confirmPassword}
          secureTextEntry={true}
        />
        {fieldErrors.confirmPassword && (
          <Text style={styles.errorText}>{fieldErrors.confirmPassword}</Text>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            (!userName || !password) && styles.buttonDisabled,
          ]}
          disabled={!userName || !password || !confirmPassword}
          onPress={() => handleRegister()}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        {fieldErrors.global && (
          <Text style={styles.errorText}>{fieldErrors.global}</Text>
        )}
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    height: 48,
    backgroundColor: '#281C9D',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonPressed: {
    backgroundColor: '#3700B3',
    transform: [{ scale: 0.97 }],
  },
  buttonDisabled: {
    backgroundColor: '#E1E1E1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    width: '100%',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginBottom: 4,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 4,
  },
  loginText: {
    marginTop: 16,
    fontSize: 14,
    color: '#0000EE',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});
