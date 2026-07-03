import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';

export default function BackButton() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  function handlePress() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={({ pressed }) => [styles.circle, { top: insets.top + 8 }, pressed && styles.pressed]}
    >
      <Text style={styles.arrow}>{'<'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 2,
  },
});
