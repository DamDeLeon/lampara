export interface WeeklyReview {
  id: string;
  weekStart: string; // ISO date, Monday
  weekEnd: string; // ISO date, Sunday
  cumplidos: number;
  total: number;
  queFunciono: string;
  queNoFunciono: string;
  ajuste: string;
}
