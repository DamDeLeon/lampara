export const colors = {
  background: '#FFFFFF',
  textPrimary: '#6F4E37',
  textHighContrast: '#4A3527',
  accentPrimary: '#CAE8B0', // cumplido, racha, estados activos
  accentSecondary: '#F4C9C1', // no cumplido (pastel, sin rojo agresivo)
  accentYellow: '#F5E6A8', // alertas suaves, revisión pendiente
  accentBlue: '#B8D8E8', // informativo/neutro, datos de historial
} as const;

export const fonts = {
  heading: 'Optima',
  body: 'Avenir Next',
} as const;

export const radius = {
  button: 16,
  card: 20,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;
