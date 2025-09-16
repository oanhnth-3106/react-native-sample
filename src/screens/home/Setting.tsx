import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RootState } from '../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../stores/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { signOut } from '../../services/auth';
import ArrowLeftIcon from '../../../assets/svgs/arrow-left.svg';
import CameraIcon from '../../../assets/svgs/camera.svg';
import SettingIcon from '../../../assets/svgs/setting_white.svg';
import HomeIcon from '../../../assets/svgs/home.svg';

type SettingScreenProps = NativeStackScreenProps<AppStackParamList, 'Setting'>;

export default function Setting({ navigation }: SettingScreenProps) {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  const handleLogout = () => {
    signOut();
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.headerLeft}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon width={20} height={20} />
          <Text style={styles.headerLeftText}>Setting</Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        <Image
          source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
          style={styles.avatar}
        />
        <Text style={styles.usernameText}>{username}</Text>
        <View>
          <Text style={styles.settingItem}>General</Text>
          <Text style={styles.settingItem}>App Information</Text>
          <Text style={styles.settingItem}>Languages</Text>
          <Pressable onPress={handleLogout}>
            <Text style={styles.settingItem}>Logout</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.actionBar}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <HomeIcon width={28} height={28} stroke="#898989" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Camera')}>
          <CameraIcon width={28} height={28} />
        </Pressable>
        <View style={styles.settingScreenIcon}>
          <SettingIcon width={20} height={20} fill="#FFFFFF" />
          <Text style={styles.settingScreenIconText}>Setting</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#281C9D',
  },
  header: {
    height: 140,
    flexDirection: 'row',
    padding: 24,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  headerLeftText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  headerIcon: {
    alignSelf: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: -40,
    marginBottom: 20,
  },
  body: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 36,
  },
  usernameText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#281C9D',
  },
  settingItem: {
    fontSize: 18,
    fontWeight: '400',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    color: '#343434',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 91,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 32,
  },
  settingScreenIcon: {
    flexDirection: 'row',
    backgroundColor: '#281C9D',
    height: 42,
    borderRadius: 21,
    width: 106,
    padding: 8,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingScreenIconText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
