import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ReceiptRow } from '../../components/ReceiptRow';
import { colors, fonts } from '../../constants/theme';
import { receipts } from '../../constants/receipts';

export default function ReceiptsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 21 }]}>
        <Text style={styles.title}>Receipts</Text>
        <View style={styles.list}>
          {receipts.map((receipt) => (
            <ReceiptRow key={receipt.id} receipt={receipt} onPress={() => router.push(`/receipt/${receipt.id}`)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingBottom: 120, gap: 20 },
  title: { fontFamily: fonts.bold, fontSize: 22, color: colors.textDark },
  list: { gap: 7 },
});
