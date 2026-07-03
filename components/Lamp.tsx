import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors, fonts, spacing } from '../constants/theme';

interface LampProps {
  lit: boolean;
  streakCount: number;
}

export default function Lamp({ lit, streakCount }: LampProps) {
  const shadeColor = lit ? colors.accentPrimary : '#D9D2C7';
  const bulbColor = lit ? colors.accentYellow : '#E8E2D6';
  const baseColor = lit ? colors.textPrimary : '#C9C0B2';

  return (
    <View style={styles.container}>
      <Svg width={120} height={130} viewBox="0 0 120 130">
        {lit && (
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="38%" r="55%">
              <Stop offset="0%" stopColor={colors.accentYellow} stopOpacity="0.9" />
              <Stop offset="100%" stopColor={colors.accentYellow} stopOpacity="0" />
            </RadialGradient>
          </Defs>
        )}
        {lit && <Circle cx="60" cy="48" r="55" fill="url(#glow)" />}

        {/* lamp shade */}
        <Path d="M35 40 L85 40 L72 8 L48 8 Z" fill={shadeColor} />
        {/* bulb */}
        <Circle cx="60" cy="44" r="9" fill={bulbColor} />
        {/* neck */}
        <Rect x="57" y="52" width="6" height="34" fill={baseColor} />
        {/* base */}
        <Rect x="30" y="86" width="60" height="10" rx="5" fill={baseColor} />
      </Svg>
      <Text style={styles.streakText}>
        {streakCount > 0
          ? `${streakCount} ${streakCount === 1 ? 'día seguido' : 'días seguidos'}`
          : 'Empieza tu Racha Hoy'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  streakText: {
    fontFamily: fonts.body,
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textHighContrast,
    marginTop: spacing.xs,
  },
});
