export interface CheckIn {
  id: string;
  fecha: string; // ISO date, e.g. 2026-07-03
  cumplio: boolean;
  hora: string;
  emocion: string;
  lugar: string;
  queHicisteEnSuLugar?: string;
}

export function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nowHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
