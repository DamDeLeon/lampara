import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Plan } from '../types/plan';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const REMINDER_TIMES = [
  { hour: 14, minute: 30 },
  { hour: 17, minute: 30 },
  { hour: 23, minute: 0 },
];

export async function scheduleStudyReminders(plan: Plan): Promise<void> {
  if (Platform.OS === 'web') return;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  const body = `Cuando ${plan.cuando}, entonces ${plan.entonces}. Señal: ${plan.senalSensorial}.`;

  for (const { hour, minute } of REMINDER_TIMES) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lámpara — hora de estudiar',
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  }
}
