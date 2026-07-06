import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRightIcon, WarningTriangleIcon } from './icons';
import { colors, fonts, radii } from '../constants/theme';
import type { Receipt } from '../constants/receipts';

export function ReceiptRow({ receipt, onPress }: { receipt: Receipt; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.merchant}>{receipt.merchant}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{receipt.category}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.amount}>{receipt.amount}</Text>
          <View style={styles.dateRow}>
            <Text style={styles.date}>{receipt.date}</Text>
            <Text style={styles.date}>{receipt.time}</Text>
          </View>
        </View>
        <ChevronRightIcon />
      </View>
      {receipt.needsReview && (
        <View style={styles.needsReview}>
          <WarningTriangleIcon />
          <Text style={styles.needsReviewText}>Needs Review</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    gap: 10,
  },
  left: {
    flex: 1,
    gap: 6,
  },
  merchant: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textBlack,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.fuelTagBg,
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  tagText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    lineHeight: 13,
    color: colors.fuelTagText,
  },
  right: {
    alignItems: 'flex-end',
    gap: 3,
  },
  amount: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
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
    lineHeight: 12,
    color: colors.textMuted2,
  },
  needsReview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.warningTintLight,
    padding: 12,
  },
  needsReviewText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 14,
    color: colors.warning,
  },
});
