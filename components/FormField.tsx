import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing } from '../constants/theme';

interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  showError?: boolean;
  multiline?: boolean;
}

export default function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  showError,
  multiline,
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          showError && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#B8A99A"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
      {showError && <Text style={styles.errorText}>Este campo es obligatorio</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  input: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.textHighContrast,
    borderWidth: 1.5,
    borderColor: colors.accentPrimary,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.accentSecondary,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: '#B5645A',
    marginTop: spacing.xs,
  },
});
