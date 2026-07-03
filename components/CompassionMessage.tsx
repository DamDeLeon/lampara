import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing } from '../constants/theme';

const MESSAGES = [
  'Hoy no cumpliste, y está bien. Fallar una vez no borra tu progreso — la autocrítica solo hace más probable que falles mañana también. Sé amable contigo y vuelve a intentarlo.',
  'Un día sin cumplir no te define. El autoperdón, no el castigo, es lo que te ayuda a retomar el plan. Mañana es una nueva oportunidad.',
  'No cumpliste hoy, y eso no significa que no puedas cumplir mañana. Trátate con la misma compasión que le ofrecerías a una amiga en tu lugar.',
];

export default function CompassionMessage() {
  const message = MESSAGES[new Date().getDate() % MESSAGES.length];
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Un momento antes de seguir</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentSecondary,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.body,
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.textHighContrast,
    marginBottom: spacing.xs,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textHighContrast,
    lineHeight: 20,
  },
});
