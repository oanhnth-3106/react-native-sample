import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function Home({ navigation }: HomeScreenProps) {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Welcome, {username}!</Text>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.textLink}>Go to Profile Screen</Text>
      </Pressable>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  textLink: {
    color: 'blue',
    marginTop: 20,
    marginBottom: 20,
  },
});
