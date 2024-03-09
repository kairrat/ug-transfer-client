import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, request} from 'react-native-permissions';
//method was called to get FCM tiken for notification
export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
    console.log('getFcmToken-->', token);
  } catch (error) {
    console.warn('getFcmToken Device Token error ', error);
  }
  return token;
};

//method was called on  user register with firebase FCM for notification
export async function registerAppWithFCM() {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .catch(error => {
        console.warn('registerDeviceForRemoteMessages error ', error);
      });
  }
}

//method was called on un register the user from firebase for stoping receiving notifications
export async function unRegisterAppWithFCM() {
  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .catch(error => {
        console.log('unregisterDeviceForRemoteMessages error ', error);
      });
  }
  await messaging().deleteToken();
}

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .catch(error => {
      console.warn('POST_NOTIFICATIONS error ', error);
    });
};

//method was called to listener events from firebase for notification triger
export function registerListenerWithFCM() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
      );
    }
  });
  notifee.onForegroundEvent(({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        break;
      case EventType.PRESS:
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    // if (remoteMessage?.data?.clickAction) {
    //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
    // }
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    });

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}