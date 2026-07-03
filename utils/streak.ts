import { CheckIn } from '../types/checkin';

export interface Streak {
  count: number;
  lit: boolean;
}

function addDays(dateISO: string, days: number): string {
  const d = new Date(dateISO + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function computeStreak(checkins: CheckIn[]): Streak {
  if (checkins.length === 0) return { count: 0, lit: false };

  // Last check-in of each day decides that day's outcome.
  const byDate = new Map<string, boolean>();
  for (const c of [...checkins].sort((a, b) => (a.fecha + a.hora < b.fecha + b.hora ? -1 : 1))) {
    byDate.set(c.fecha, c.cumplio);
  }

  const dates = [...byDate.keys()].sort().reverse();
  const mostRecentDate = dates[0];
  const lit = byDate.get(mostRecentDate) === true;

  let count = 0;
  let cursor = mostRecentDate;
  while (byDate.get(cursor) === true) {
    count += 1;
    cursor = addDays(cursor, -1);
  }

  return { count, lit };
}
