import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Plan } from '../types/plan';
import { CheckIn, todayISODate } from '../types/checkin';
import { WeeklyReview } from '../types/review';
import { loadJSON, STORAGE_KEYS } from './storage';

export async function exportHistorial(): Promise<void> {
  const [plan, checkins, weeklyReviews] = await Promise.all([
    loadJSON<Plan>(STORAGE_KEYS.plan),
    loadJSON<CheckIn[]>(STORAGE_KEYS.checkins),
    loadJSON<WeeklyReview[]>(STORAGE_KEYS.weeklyReviews),
  ]);

  const payload = {
    exportadoEl: new Date().toISOString(),
    plan,
    checkins: checkins ?? [],
    weeklyReviews: weeklyReviews ?? [],
  };

  const file = new File(Paths.cache, `lampara-historial-${todayISODate()}.json`);
  if (file.exists) file.delete();
  file.create();
  file.write(JSON.stringify(payload, null, 2));

  const available = await Sharing.isAvailableAsync();
  if (available) {
    await Sharing.shareAsync(file.uri, {
      mimeType: 'application/json',
      dialogTitle: 'Exportar historial de Lámpara',
    });
  }
}
