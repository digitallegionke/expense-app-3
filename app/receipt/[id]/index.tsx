import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  BackArrowIcon,
  ChevronRightIcon,
  ExternalArrowIcon,
  MoreIcon,
  ShieldCheckIcon,
  WarningTriangleIcon,
} from '../../../components/icons';
import { ReceiptImageCard } from '../../../components/ReceiptImageCard';
import { CategoryRow } from '../../../components/CategoryRow';
import { MismatchFields } from '../../../components/MismatchFields';
import { colors, fonts, radii } from '../../../constants/theme';
import { receipts } from '../../../constants/receipts';

export default function ReceiptDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const receipt = receipts.find((r) => r.id === id) ?? receipts[0];

  return (
    <View style={styles.screen}>
      <View style={[styles.toolbar, { paddingTop: insets.top + 10 }]}>
        <Pressable style={styles.toolbarButton} onPress={() => router.back()}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.toolbarTitle}>Receipts</Text>
        <Pressable style={styles.toolbarButton}>
          <MoreIcon />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Needs Review</Text>
          <View style={styles.reviewCard}>
            <View style={styles.reviewRow}>
              <View style={styles.reviewLeft}>
                <Text style={styles.merchant}>{receipt.merchant}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{receipt.category}</Text>
                </View>
              </View>
              <View style={styles.reviewRight}>
                <Text style={styles.amount}>{receipt.amount}</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.date}>{receipt.date}</Text>
                  <Text style={styles.date}>{receipt.time}</Text>
                </View>
              </View>
              <ChevronRightIcon />
            </View>
            {receipt.needsReview && (
              <View style={styles.needsReviewBanner}>
                <WarningTriangleIcon />
                <Text style={styles.needsReviewText}>Needs Review</Text>
              </View>
            )}
          </View>
        </View>

        {receipt.confirmedViaKra && (
          <View style={styles.confirmedBanner}>
            <ShieldCheckIcon />
            <Text style={styles.confirmedText}>Confirmed via KRA eTIMS Portal</Text>
          </View>
        )}

        <ReceiptImageCard />
        <CategoryRow category={receipt.category} />

        {receipt.mismatchFields && receipt.mismatchFields.length > 0 && (
          <MismatchFields note={receipt.mismatchNote} fields={receipt.mismatchFields} />
        )}

        <Pressable style={styles.portalButton} onPress={() => router.push(`/receipt/${receipt.id}/details`)}>
          <Text style={styles.portalButtonText}>View Receipt Details</Text>
          <ExternalArrowIcon />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  toolbarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  toolbarTitle: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    letterSpacing: -0.43,
    lineHeight: 27,
    color: '#666666',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 60,
    gap: 20,
  },
  reviewSection: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 12,
    gap: 7,
  },
  reviewTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textDark,
  },
  reviewCard: {
    backgroundColor: colors.cardOverlay,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    gap: 10,
  },
  reviewLeft: {
    flex: 1,
    gap: 15,
  },
  merchant: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textBlack,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.fuelTagBg,
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 11,
    marginTop: 6,
  },
  tagText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    lineHeight: 13,
    color: colors.fuelTagText,
  },
  reviewRight: {
    alignItems: 'flex-end',
    gap: 3,
  },
  amount: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.teal,
    textAlign: 'right',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 4,
  },
  date: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 14,
    color: colors.textMuted2,
  },
  needsReviewBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.warningTintStrong,
    padding: 12,
  },
  needsReviewText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.warning,
  },
  confirmedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.tealTint,
    borderRadius: 4,
    padding: 10,
  },
  confirmedText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textBlack,
  },
  portalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primaryTint,
    borderRadius: radii.md,
    padding: 14,
  },
  portalButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.primary,
  },
});
