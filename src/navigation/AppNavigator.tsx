import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/Login';
import HomeScreen from '../screens/home/Home';
import ProfileScreen from '../screens/home/Profile';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NavigationContainer } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParamList>();
const App = createNativeStackNavigator<AppStackParamList>();

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

const AppStack = () => {
  return (
    <App.Navigator>
      <App.Screen name="Home" component={HomeScreen} />
      <App.Screen name="Profile" component={ProfileScreen} />
    </App.Navigator>
  );
};

export default function AppNavigator() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
