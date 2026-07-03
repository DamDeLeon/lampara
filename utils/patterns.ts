import { CheckIn } from '../types/checkin';

export function timeBucket(hora: string): string {
  const [hStr] = hora.split(':');
  const h = Number(hStr);
  if (Number.isNaN(h)) return 'hora desconocida';
  if (h >= 5 && h < 12) return 'la mañana';
  if (h >= 12 && h < 18) return 'la tarde';
  if (h >= 18 && h < 22) return 'la noche';
  return 'la madrugada';
}

export function mostFrequent(items: string[]): { value: string; count: number } | null {
  if (items.length === 0) return null;
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  let best: { value: string; count: number } | null = null;
  for (const [value, count] of counts) {
    if (!best || count > best.count) {
      best = { value, count };
    }
  }
  return best;
}

export function detectPattern(checkins: CheckIn[]): string {
  const fallos = checkins.filter((c) => !c.cumplio);

  if (fallos.length === 0) {
    return 'Aún no has registrado fallos. ¡Sigue así!';
  }
  if (fallos.length === 1) {
    return 'Solo tienes un fallo registrado. Con más check-ins podremos detectar un patrón.';
  }

  const bucket = mostFrequent(fallos.map((c) => timeBucket(c.hora)));
  const emocion = mostFrequent(fallos.map((c) => c.emocion.trim().toLowerCase()));
  const lugar = mostFrequent(fallos.map((c) => c.lugar.trim().toLowerCase()));

  const partes: string[] = [];
  if (bucket) partes.push(`por ${bucket.value}`);
  if (emocion) partes.push(`sintiéndote ${emocion.value}`);
  if (lugar) partes.push(`en ${lugar.value}`);

  return `En tus últimos ${fallos.length} fallos, el patrón más frecuente fue: sueles fallar ${partes.join(', ')}.`;
}
