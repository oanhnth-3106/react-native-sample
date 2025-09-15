import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/stores/store';
import AppNavigator from './src/navigation/AppNavigator';
import { useFirebaseNotifications } from './src/hooks/useFCM';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useFirebaseNotifications();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
