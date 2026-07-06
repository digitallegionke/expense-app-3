import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BellIcon } from '../../components/icons';
import { ReceiptRow } from '../../components/ReceiptRow';
import { colors, fonts, radii } from '../../constants/theme';
import { receipts } from '../../constants/receipts';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 21 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.name}>Hi Hadija</Text>
          </View>
          <BellIcon />
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceRow}>
              <View style={styles.balanceRowInner}>
                <Text style={styles.totalSpend}>KES 54,405</Text>
                <View style={styles.pctPill}>
                  <Text style={styles.pctText}>+5.6%</Text>
                </View>
              </View>
              <Text style={styles.balanceLabel}>Total Spend</Text>
            </View>
            <View style={styles.balanceRow}>
              <Text style={styles.totalTax}>KES 8,704.8</Text>
              <Text style={styles.balanceLabel}>Total Spend</Text>
            </View>
          </View>

          <View style={styles.miniCard}>
            <Text style={styles.miniValue}>23</Text>
            <Text style={styles.miniLabel}>Total Receipts</Text>
          </View>
          <View style={styles.miniCard}>
            <Text style={styles.miniValue}>3</Text>
            <Text style={styles.miniLabel}>Processing</Text>
          </View>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Receipts</Text>
            <Pressable onPress={() => router.push('/(tabs)/receipts')}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          <View style={styles.recentList}>
            {receipts.map((receipt) => (
              <ReceiptRow
                key={receipt.id}
                receipt={receipt}
                onPress={() => router.push(`/receipt/${receipt.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.scanButtonWrap, { bottom: 8 }]} pointerEvents="box-none">
        <Pressable style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Scan Receipt</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 120,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 19,
    color: colors.textDark,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 30,
    color: colors.textDark,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  balanceCard: {
    flexBasis: '100%',
    backgroundColor: '#EEEEEE',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.cardOutline,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 17,
  },
  balanceRow: {
    gap: 2,
  },
  balanceRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  totalSpend: {
    fontFamily: fonts.monoSemibold,
    fontSize: 32,
    letterSpacing: -0.64,
    lineHeight: 43,
    color: colors.teal,
  },
  totalTax: {
    fontFamily: fonts.monoMedium,
    fontSize: 22,
    letterSpacing: -0.64,
    lineHeight: 30,
    color: colors.textMuted5,
  },
  pctPill: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#00000012',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  pctText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textBlack,
  },
  balanceLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
  },
  miniCard: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.cardOutline,
    padding: 16,
    gap: 2,
  },
  miniValue: {
    fontFamily: fonts.monoSemibold,
    fontSize: 26,
    letterSpacing: -0.64,
    lineHeight: 35,
    color: colors.textBlack,
  },
  miniLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
  },
  recentSection: {
    gap: 15,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textBlack,
  },
  seeAll: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.primary,
  },
  recentList: {
    gap: 7,
  },
  scanButtonWrap: {
    position: 'absolute',
    left: 18,
    right: 18,
  },
  scanButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.round,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  scanButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 25,
    color: colors.white,
  },
});
