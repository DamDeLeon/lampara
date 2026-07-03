import { Pressable, Text, View, StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing } from '../constants/theme';

interface OutcomeToggleProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export default function OutcomeToggle({ value, onChange }: OutcomeToggleProps) {
  return (
    <View style={styles.row}>
      <Option label="Sí Cumplí" selected={value === true} activeColor="#9DF2FA" onPress={() => onChange(true)} />
      <Option label="No Cumplí" selected={value === false} activeColor="#F272E7" onPress={() => onChange(false)} />
    </View>
  );
}

function Option({
  label,
  selected,
  activeColor,
  onPress,
}: {
  label: string;
  selected: boolean;
  activeColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        { backgroundColor: selected ? activeColor : colors.background, borderColor: selected ? activeColor : colors.textPrimary },
      ]}
    >
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  option: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: radius.button,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  optionLabel: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  optionLabelSelected: {
    color: colors.textHighContrast,
  },
});
