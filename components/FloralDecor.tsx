import { View, ViewStyle } from 'react-native';
import Svg, { G, Circle, Ellipse, Path } from 'react-native-svg';

type Variant = 'blossom' | 'sprig' | 'daisy';

interface FloralDecorProps {
  variant: Variant;
  size?: number;
  color?: string;
  opacity?: number;
  rotation?: number;
  style?: ViewStyle;
}

export default function FloralDecor({
  variant,
  size = 70,
  color = '#FFFFFF',
  opacity = 0.3,
  rotation = 0,
  style,
}: FloralDecorProps) {
  return (
    <View pointerEvents="none" style={[{ position: 'absolute', transform: [{ rotate: `${rotation}deg` }] }, style]}>
      {variant === 'blossom' && <Blossom size={size} color={color} opacity={opacity} />}
      {variant === 'sprig' && <Sprig size={size} color={color} opacity={opacity} />}
      {variant === 'daisy' && <Daisy size={size} color={color} opacity={opacity} />}
    </View>
  );
}

function Blossom({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G stroke={color} strokeWidth={1.4} fill="none" opacity={opacity}>
        <Ellipse cx="50" cy="28" rx="11" ry="20" transform="rotate(0 50 50)" />
        <Ellipse cx="50" cy="28" rx="11" ry="20" transform="rotate(72 50 50)" />
        <Ellipse cx="50" cy="28" rx="11" ry="20" transform="rotate(144 50 50)" />
        <Ellipse cx="50" cy="28" rx="11" ry="20" transform="rotate(216 50 50)" />
        <Ellipse cx="50" cy="28" rx="11" ry="20" transform="rotate(288 50 50)" />
        <Circle cx="50" cy="50" r="6" />
      </G>
    </Svg>
  );
}

function Daisy({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  const petals = Array.from({ length: 10 });
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G stroke={color} strokeWidth={1} fill="none" opacity={opacity}>
        {petals.map((_, i) => (
          <Ellipse key={i} cx="50" cy="24" rx="6" ry="22" transform={`rotate(${i * 36} 50 50)`} />
        ))}
        <Circle cx="50" cy="50" r="7" strokeDasharray="2,2" />
      </G>
    </Svg>
  );
}

function Sprig({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  return (
    <Svg width={size * 0.5} height={size} viewBox="0 0 50 120">
      <G stroke={color} strokeWidth={1.4} fill="none" opacity={opacity}>
        <Path d="M25 115 L25 8" />
        <Ellipse cx="14" cy="30" rx="9" ry="4.5" transform="rotate(-35 14 30)" />
        <Ellipse cx="36" cy="50" rx="9" ry="4.5" transform="rotate(35 36 50)" />
        <Ellipse cx="14" cy="70" rx="9" ry="4.5" transform="rotate(-35 14 70)" />
        <Ellipse cx="36" cy="90" rx="9" ry="4.5" transform="rotate(35 36 90)" />
      </G>
    </Svg>
  );
}
