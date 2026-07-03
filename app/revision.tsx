import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import Title from '../components/Title';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { colors, fonts, radius, spacing } from '../constants/theme';
import { CheckIn } from '../types/checkin';
import { WeeklyReview } from '../types/review';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';
import { getCurrentWeekRange, isWithinRange } from '../utils/week';
import FloralDecor from '../components/FloralDecor';
import BackButton from '../components/BackButton';

export default function RevisionSemanalScreen() {
  const router = useRouter();
  const [queFunciono, setQueFunciono] = useState('');
  const [queNoFunciono, setQueNoFunciono] = useState('');
  const [ajuste, setAjuste] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cumplidos, setCumplidos] = useState(0);
  const [total, setTotal] = useState(0);

  const { start, end } = getCurrentWeekRange();

  useEffect(() => {
    loadJSON<CheckIn[]>(STORAGE_KEYS.checkins).then((stored) => {
      const checkins = stored ?? [];
      const semana = checkins.filter((c) => isWithinRange(c.fecha, start, end));
      setTotal(semana.length);
      setCumplidos(semana.filter((c) => c.cumplio).length);
    });
  }, []);

  function isEmpty(value: string) {
    return value.trim().length === 0;
  }

  async function handleSave() {
    if (isEmpty(queFunciono) || isEmpty(queNoFunciono) || isEmpty(ajuste)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);

    const review: WeeklyReview = {
      id: `${Date.now()}`,
      weekStart: start,
      weekEnd: end,
      cumplidos,
      total,
      queFunciono,
      queNoFunciono,
      ajuste,
    };

    const existing = (await loadJSON<WeeklyReview[]>(STORAGE_KEYS.weeklyReviews)) ?? [];
    await saveJSON(STORAGE_KEYS.weeklyReviews, [...existing, review]);
    setSaved(true);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <FloralDecor variant="daisy" size={58} color={colors.textPrimary} opacity={0.14} rotation={-12} style={{ top: 6, right: 2 }} />
      <BackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Revisión semanal</Title>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Esta semana ({start} a {end}) cumpliste {cumplidos} de {total} check-ins.
          </Text>
        </View>

        {!saved && (
          <>
            <FormField
              label="¿Qué funcionó?"
              placeholder="ej. dejar el celular en otro cuarto sí ayudó"
              value={queFunciono}
              onChangeText={setQueFunciono}
              showError={showErrors && isEmpty(queFunciono)}
              multiline
            />
            <FormField
              label="¿Qué no funcionó?"
              placeholder="ej. las noches que llegué muy cansada"
              value={queNoFunciono}
              onChangeText={setQueNoFunciono}
              showError={showErrors && isEmpty(queNoFunciono)}
              multiline
            />
            <FormField
              label="¿Qué vas a ajustar la próxima semana?"
              placeholder="ej. mover mi hora de estudio más temprano"
              value={ajuste}
              onChangeText={setAjuste}
              showError={showErrors && isEmpty(ajuste)}
              multiline
            />
            <Button label="Guardar Revisión" onPress={handleSave} />
          </>
        )}

        {saved && (
          <View style={styles.savedBox}>
            <Title style={styles.savedTitle}>Revisión guardada</Title>
            <Button label="Volver a Mi Plan" onPress={() => router.push('/')} variant="secondary" style={styles.savedButton} />
          </View>
        )}

        {!saved && (
          <Button label="Volver a Mi Plan" onPress={() => router.push('/')} variant="secondary" style={styles.backButton} />
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
    marginBottom: spacing.lg,
  },
  summaryBox: {
    backgroundColor: colors.accentBlue,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textHighContrast,
  },
  savedBox: {
    marginTop: spacing.md,
  },
  savedTitle: {
    fontSize: 22,
    marginBottom: spacing.md,
  },
  savedButton: {
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  backButton: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
});
