import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import Title from '../components/Title';
import Button from '../components/Button';
import { colors, fonts, radius, spacing } from '../constants/theme';
import { CheckIn } from '../types/checkin';
import { loadJSON, STORAGE_KEYS } from '../utils/storage';
import { detectPattern } from '../utils/patterns';
import { exportHistorial } from '../utils/export';
import FloralDecor from '../components/FloralDecor';
import BackButton from '../components/BackButton';

export default function HistorialScreen() {
  const router = useRouter();
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [exportError, setExportError] = useState('');

  useEffect(() => {
    loadJSON<CheckIn[]>(STORAGE_KEYS.checkins).then((stored) => {
      if (stored) setCheckins(stored);
    });
  }, []);

  const ordered = [...checkins].sort((a, b) => (a.fecha + a.hora < b.fecha + b.hora ? 1 : -1));

  async function handleExport() {
    setExportError('');
    try {
      await exportHistorial();
    } catch {
      setExportError('No se pudo exportar en este dispositivo/navegador.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <FloralDecor variant="sprig" size={72} color={colors.textPrimary} opacity={0.12} rotation={14} style={{ bottom: 4, right: -6 }} />
      <BackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Historial</Title>

        <Button label="Exportar historial" onPress={handleExport} variant="secondary" style={styles.exportButton} />
        {exportError.length > 0 && <Text style={styles.exportError}>{exportError}</Text>}

        {checkins.length > 0 && (
          <View style={styles.patternBox}>
            <Text style={styles.patternLabel}>Detección de patrones</Text>
            <Text style={styles.patternText}>{detectPattern(checkins)}</Text>
          </View>
        )}

        {ordered.length === 0 && (
          <Text style={styles.emptyText}>Aún no tienes check-ins registrados.</Text>
        )}

        {ordered.map((c) => (
          <View
            key={c.id}
            style={[
              styles.item,
              { backgroundColor: c.cumplio ? colors.accentPrimary : colors.accentSecondary },
            ]}
          >
            <Text style={styles.itemHeader}>
              {c.fecha} · {c.hora} · {c.cumplio ? 'Cumplí' : 'No cumplí'}
            </Text>
            <Text style={styles.itemDetail}>Emoción: {c.emocion}</Text>
            <Text style={styles.itemDetail}>Lugar: {c.lugar}</Text>
            {!c.cumplio && c.queHicisteEnSuLugar && (
              <Text style={styles.itemDetail}>En su lugar: {c.queHicisteEnSuLugar}</Text>
            )}
          </View>
        ))}

        <Button label="Volver a Mi Plan" onPress={() => router.push('/')} variant="secondary" style={styles.backButton} />
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
  patternBox: {
    backgroundColor: colors.accentYellow,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  patternLabel: {
    fontFamily: fonts.body,
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.textHighContrast,
    marginBottom: spacing.xs,
  },
  patternText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textHighContrast,
    lineHeight: 20,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  item: {
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemHeader: {
    fontFamily: fonts.body,
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.textHighContrast,
    marginBottom: spacing.xs,
  },
  itemDetail: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textHighContrast,
  },
  backButton: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  exportButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  exportError: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: '#B5645A',
    marginBottom: spacing.md,
  },
});
