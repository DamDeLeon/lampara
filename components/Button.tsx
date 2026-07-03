import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, fonts, radius, spacing } from '../constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export default function Button({ label, onPress, variant = 'primary', style, labelStyle }: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: isPrimary ? colors.accentPrimary : colors.textPrimary },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.button,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
