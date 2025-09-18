import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { login } from '../../stores/auth';
import { useDispatch } from 'react-redux';
import { signIn } from '../../services/auth';
import { getAuthErrorMessage } from '../../utils/authErrorHandler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import CityLifeIcon from '../../../assets/svgs/city_life.svg';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function Login({ navigation }: LoginScreenProps) {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});

  const handleLogin = async () => {
    try {
      const userCredential = await signIn(userName, password);
      dispatch(login({ userName: userCredential.user.email ?? '' }));
    } catch (err: any) {
      const msg = getAuthErrorMessage(err.code);
      setFieldErrors(msg);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.loginForm}>
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
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            (!userName || !password) && styles.buttonDisabled,
          ]}
          disabled={!userName || !password}
          onPress={() => handleLogin()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        {fieldErrors.global && (
          <Text style={styles.errorText}>{fieldErrors.global}</Text>
        )}
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </Pressable>
      </View>
      <CityLifeIcon width={'100%'} height={200} style={styles.bgIcon} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loginForm: {
    padding: 20,
    flex: 1,
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
  registerText: {
    marginTop: 16,
    fontSize: 14,
    color: '#0000EE',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  bgIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 120,
  },
});
