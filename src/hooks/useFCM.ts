import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  } else {
    await messaging().requestPermission();
  }
}

export function useFirebaseNotifications() {
  useEffect(() => {
    async function init() {
      await requestUserPermission();

      // Create channel for Android
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      console.log('Channel created:', channelId);

      // Get FCM token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      // Listen for foreground messages
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title ?? 'Thông báo',
          body: remoteMessage.notification?.body ?? 'Bạn có thông báo mới',
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
          },
        });
      });

      return unsubscribe;
    }

    init();
  }, []);
}
