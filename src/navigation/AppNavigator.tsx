import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/auth/Login';
import HomeScreen from '../screens/home/Home';
import SettingScreen from '../screens/home/Setting';
import BlogListScreen from '../screens/blog/BlogList';
import BlogDetailScreen from '../screens/blog/BlogDetail';
import RegisterScreen from '../screens/auth/Register';
import TaskList from '../screens/task/TaskList';
import CreateTask from '../screens/task/CreateTask';
import DetailTask from '../screens/task/DetailTask';
import EditTask from '../screens/task/EditTask';
import CameraScreen from '../screens/camera/CameraScreen';
import RecordScreen from '../screens/camera/RecordScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Setting: undefined;
  BlogList: undefined;
  BlogDetail: { id: string };
  TaskList: undefined;
  CreateTask: undefined;
  DetailTask: { id: string };
  EditTask: { id: string };
  Camera: undefined;
  Record: undefined;
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
      <Auth.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

const AppStack = () => {
  return (
    <App.Navigator>
      <App.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="BlogList"
        component={BlogListScreen}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="BlogDetail"
        component={BlogDetailScreen}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="TaskList"
        component={TaskList}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="CreateTask"
        component={CreateTask}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="DetailTask"
        component={DetailTask}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="EditTask"
        component={EditTask}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="Record"
        component={RecordScreen}
        options={{ headerShown: false }}
      />
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
