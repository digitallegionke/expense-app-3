import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../constants/theme';

export default function VatScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 21 }]}>
      <Text style={styles.title}>VAT</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 18, gap: 8 },
  title: { fontFamily: fonts.bold, fontSize: 22, color: colors.textDark },
  subtitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.textMuted },
});
