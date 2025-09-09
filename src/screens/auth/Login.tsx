import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { login } from '../../store/auth';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ userName, password }));
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
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={val => setPassword(val)}
          defaultValue={password}
          secureTextEntry={true}
        />
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
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
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
    marginBottom: 16,
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
  },
});
