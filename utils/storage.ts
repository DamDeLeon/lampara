import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  plan: 'lampara_plan',
  checkins: 'lampara_checkins',
  weeklyReviews: 'lampara_weekly_reviews',
} as const;

export async function loadJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  return JSON.parse(raw) as T;
}

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
