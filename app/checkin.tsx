import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import Title from '../components/Title';
import FormField from '../components/FormField';
import Button from '../components/Button';
import OutcomeToggle from '../components/OutcomeToggle';
import CompassionMessage from '../components/CompassionMessage';
import FloralDecor from '../components/FloralDecor';
import BackButton from '../components/BackButton';
import { colors, spacing } from '../constants/theme';
import { CheckIn, nowHHMM, todayISODate } from '../types/checkin';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

export default function CheckInScreen() {
  const router = useRouter();
  const [cumplio, setCumplio] = useState<boolean | null>(null);
  const [hora, setHora] = useState(nowHHMM());
  const [emocion, setEmocion] = useState('');
  const [lugar, setLugar] = useState('');
  const [queHicisteEnSuLugar, setQueHicisteEnSuLugar] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [saved, setSaved] = useState(false);

  function isEmpty(value: string) {
    return value.trim().length === 0;
  }

  const missingOutcome = cumplio === null;
  const missingHora = isEmpty(hora);
  const missingEmocion = isEmpty(emocion);
  const missingLugar = isEmpty(lugar);
  const missingQueHiciste = cumplio === false && isEmpty(queHicisteEnSuLugar);

  async function handleSave() {
    if (missingOutcome || missingHora || missingEmocion || missingLugar || missingQueHiciste) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);

    const checkIn: CheckIn = {
      id: `${Date.now()}`,
      fecha: todayISODate(),
      cumplio: cumplio as boolean,
      hora,
      emocion,
      lugar,
      ...(cumplio === false ? { queHicisteEnSuLugar } : {}),
    };

    const existing = (await loadJSON<CheckIn[]>(STORAGE_KEYS.checkins)) ?? [];
    await saveJSON(STORAGE_KEYS.checkins, [...existing, checkIn]);
    setSaved(true);
  }

  function handleReset() {
    setCumplio(null);
    setHora(nowHHMM());
    setEmocion('');
    setLugar('');
    setQueHicisteEnSuLugar('');
    setShowErrors(false);
    setSaved(false);
  }

  return (
    <SafeAreaView style={[styles.safeArea, saved && styles.safeAreaSaved]} edges={['bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <FloralDecor variant="blossom" size={60} color={colors.textPrimary} opacity={0.13} rotation={-8} style={{ top: 6, right: 0 }} />
      <BackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Check-In de Hoy</Title>

        {!saved && (
          <>
            <FormField
              label="Hora"
              placeholder="ej. 20:15"
              value={hora}
              onChangeText={setHora}
              showError={showErrors && missingHora}
            />
            <FormField
              label="¿Cómo te sentiste?"
              placeholder="ej. cansada, ansiosa, motivada"
              value={emocion}
              onChangeText={setEmocion}
              showError={showErrors && missingEmocion}
            />
            <FormField
              label="¿Dónde estabas?"
              placeholder="ej. mi cuarto, la sala"
              value={lugar}
              onChangeText={setLugar}
              showError={showErrors && missingLugar}
            />

            <OutcomeToggle value={cumplio} onChange={setCumplio} />
            {showErrors && missingOutcome && (
              <View style={styles.errorSpacer} />
            )}

            {cumplio === false && (
              <FormField
                label="¿Qué hiciste en su lugar?"
                placeholder="ej. vi videos, dormí"
                value={queHicisteEnSuLugar}
                onChangeText={setQueHicisteEnSuLugar}
                showError={showErrors && missingQueHiciste}
              />
            )}

            {cumplio === false && <CompassionMessage />}

            <Button label="Guardar Check-In" onPress={handleSave} />
          </>
        )}

        {saved && (
          <View style={styles.savedBox}>
            <Title style={styles.savedTitle}>Check-In Guardado :)</Title>
            <Button label="Registrar otro check-in" onPress={handleReset} variant="secondary" style={styles.savedButton} />
            <Button label="Ver historial" onPress={() => router.push('/historial')} variant="secondary" style={styles.savedButton} />
            <Button label="Volver a Mi Plan" onPress={() => router.push('/')} variant="secondary" style={styles.savedButton} />
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
  safeAreaSaved: {
    backgroundColor: '#F272E7',
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.lg,
  },
  errorSpacer: {
    height: spacing.sm,
  },
  savedBox: {
    marginTop: spacing.lg,
  },
  savedTitle: {
    fontSize: 22,
    marginBottom: spacing.md,
  },
  savedButton: {
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
});
