export interface Plan {
  cuando: string;
  entonces: string;
  senalSensorial: string;
  friccion: string;
  compromiso: string;
}

export const emptyPlan: Plan = {
  cuando: '',
  entonces: '',
  senalSensorial: '',
  friccion: '',
  compromiso: '',
};

export function planToShareText(plan: Plan): string {
  return [
    'Mi plan en Lámpara:',
    `Cuando ${plan.cuando}, entonces ${plan.entonces}.`,
    `Señal de que empiezo: ${plan.senalSensorial}.`,
    `Para limitar la distracción...: ${plan.friccion}.`,
    `Mi compromiso: ${plan.compromiso}.`,
  ].join('\n');
}
