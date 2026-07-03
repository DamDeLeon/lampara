import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import FormField from '../components/FormField';
import Button from '../components/Button';
import Title from '../components/Title';
import Lamp from '../components/Lamp';
import FloralDecor from '../components/FloralDecor';
import { colors, fonts, radius, spacing } from '../constants/theme';
import { emptyPlan, Plan, planToShareText } from '../types/plan';
import { CheckIn } from '../types/checkin';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';
import { computeStreak } from '../utils/streak';
import { scheduleStudyReminders } from '../utils/notifications';

export default function PlanSetupScreen() {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>(emptyPlan);
  const [showErrors, setShowErrors] = useState(false);
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState({ count: 0, lit: false });

  useEffect(() => {
    loadJSON<Plan>(STORAGE_KEYS.plan).then((stored) => {
      if (stored) {
        setPlan(stored);
        setSaved(true);
        scheduleStudyReminders(stored);
      }
    });
    loadJSON<CheckIn[]>(STORAGE_KEYS.checkins).then((stored) => {
      setStreak(computeStreak(stored ?? []));
    });
  }, []);

  function updateField(field: keyof Plan, value: string) {
    setPlan((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function isEmpty(value: string) {
    return value.trim().length === 0;
  }

  const fields: { key: keyof Plan; label: string; placeholder: string }[] = [
    { key: 'cuando', label: 'Cuando...', placeholder: 'ej. sean las 8:00pm' },
    { key: 'entonces', label: 'entonces...', placeholder: 'ej. estudiaré 30 minutos' },
    { key: 'senalSensorial', label: 'Señal del Modo Estudio', placeholder: 'ej. prender la lámpara de mi escritorio' },
    { key: 'friccion', label: 'Fricción para la Distracción', placeholder: 'ej. dejar el celular en otro cuarto' },
    { key: 'compromiso', label: 'Mi Compromiso y Consecuencia', placeholder: 'ej. si no cumplo, le transfiero $50 a mi hermana' },
  ];

  async function handleSave() {
    const hasEmptyField = fields.some((f) => isEmpty(plan[f.key]));
    if (hasEmptyField) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    await saveJSON(STORAGE_KEYS.plan, plan);
    setSaved(true);
    await scheduleStudyReminders(plan);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <FloralDecor variant="daisy" size={64} color={colors.textPrimary} opacity={0.14} rotation={12} style={{ top: 8, right: 4 }} />
      <FloralDecor variant="sprig" size={80} color={colors.textPrimary} opacity={0.12} rotation={-10} style={{ bottom: 10, left: -6 }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Lamp lit={streak.lit} streakCount={streak.count} />
        <Title style={styles.title}>Tu Plan</Title>
        <Text style={styles.subtitle}>
          Define tu intención de implementación.
        </Text>

        {fields.map((f) => (
          <FormField
            key={f.key}
            label={f.label}
            placeholder={f.placeholder}
            value={plan[f.key]}
            onChangeText={(text) => updateField(f.key, text)}
            showError={showErrors && isEmpty(plan[f.key])}
            multiline={f.key === 'compromiso' || f.key === 'friccion'}
          />
        ))}

        <Button label="Guardar Plan" onPress={handleSave} labelStyle={styles.saveButtonLabel} />

        {saved && (
          <View style={styles.sharePreview}>
            <Text style={styles.sharePreviewLabel}>Plan guardado. Texto para compartir:</Text>
            <Text style={styles.sharePreviewText}>{planToShareText(plan)}</Text>
          </View>
        )}

        {saved && (
          <Button
            label="Ir a mi check-in de hoy"
            onPress={() => router.push('/checkin')}
            style={styles.checkinButton}
          />
        )}

        {saved && (
          <View style={styles.navRow}>
            <Button label="Historial" onPress={() => router.push('/historial')} variant="secondary" style={styles.navButton} />
            <Button label="Revisión semanal" onPress={() => router.push('/revision')} variant="secondary" style={styles.navButton} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  sharePreview: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.accentYellow,
    borderRadius: radius.card,
  },
  sharePreviewLabel: {
    fontFamily: fonts.body,
    fontWeight: '600',
    fontSize: 13,
    color: colors.textHighContrast,
    marginBottom: spacing.xs,
  },
  sharePreviewText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textHighContrast,
    marginBottom: spacing.md,
  },
  checkinButton: {
    marginTop: spacing.md,
  },
  navRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  navButton: {
    flex: 1,
  },
  saveButtonLabel: {
    fontSize: 19,
  },
});
