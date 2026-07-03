import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { fonts } from '../constants/theme';
import FloralDecor from './FloralDecor';

const WELCOME_BG = '#F272E7';

export default function WelcomeOverlay({ onDone }: { onDone: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(dismiss, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    Animated.timing(opacity, { toValue: 0, duration: 350, useNativeDriver: true }).start(() => {
      setVisible(false);
      onDone();
    });
  }

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} />

      <FloralDecor variant="blossom" size={90} color="#FFFFFF" opacity={0.35} rotation={-15} style={{ top: 50, left: -20 }} />
      <FloralDecor variant="sprig" size={130} color="#FFFFFF" opacity={0.3} rotation={20} style={{ bottom: 40, right: -10 }} />
      <FloralDecor variant="daisy" size={70} color="#FFFFFF" opacity={0.4} rotation={10} style={{ top: 110, right: 30 }} />
      <FloralDecor variant="blossom" size={60} color="#FFFFFF" opacity={0.3} rotation={35} style={{ bottom: 140, left: 30 }} />
      <FloralDecor variant="sprig" size={90} color="#FFFFFF" opacity={0.25} rotation={-25} style={{ top: -10, right: 60 }} />

      <Text style={styles.hello}>¡Hola!</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: WELCOME_BG,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  hello: {
    fontFamily: fonts.heading,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 52,
    color: '#FFFFFF',
  },
});
