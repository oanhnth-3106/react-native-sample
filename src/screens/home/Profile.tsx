import { StyleSheet, Text, View } from 'react-native';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export default function Profile() {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Profile Screen {username}</Text>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
