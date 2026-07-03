import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from '../constants/theme';

interface TitleProps {
  children: string;
  style?: TextStyle;
}

export default function Title({ children, style }: TitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textHighContrast,
  },
});
