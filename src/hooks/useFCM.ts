import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
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
    let foregroundUnsubscribe: (() => void) | undefined;

    async function init() {
      await requestUserPermission();

      // Create channel for Android
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Get FCM token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      await messaging().subscribeToTopic('tasks');

      // Foreground notifications
      foregroundUnsubscribe = messaging().onMessage(async remoteMessage => {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title ?? 'Thông báo',
          body: remoteMessage.notification?.body ?? 'Bạn có thông báo mới',
          android: {
            channelId,
            pressAction: { id: 'default' },
          },
        });
      });

      // Background / Killed notifications
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title ?? 'Thông báo',
          body: remoteMessage.notification?.body ?? 'Bạn có thông báo mới',
          android: {
            channelId,
            pressAction: { id: 'default' },
          },
        });
      });

      // Handle notification press (foreground)
      notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS) {
          console.log('User pressed notification:', detail.notification);
        }
      });
    }

    init();

    return () => {
      if (foregroundUnsubscribe) foregroundUnsubscribe();
    };
  }, []);
}
