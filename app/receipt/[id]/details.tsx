import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  BackArrowIcon,
  CardIcon,
  CopyIcon,
  ExternalArrowIcon,
  ListIcon,
  MoreIcon,
  PencilIcon,
  ShieldCheckIcon,
  TagIcon,
} from '../../../components/icons';
import { ReceiptImageCard } from '../../../components/ReceiptImageCard';
import { CategoryRow } from '../../../components/CategoryRow';
import { KraFieldsTable } from '../../../components/KraFieldsTable';
import { colors, fonts, radii } from '../../../constants/theme';
import { receipts } from '../../../constants/receipts';

export default function ReceiptDetailsScreen() {
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
        <Text style={styles.toolbarTitle}>Receipt Details</Text>
        <Pressable style={styles.toolbarButton}>
          <MoreIcon />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.insightsSection}>
          <View style={styles.insightsHeader}>
            <Text style={styles.eyebrow}>INSIGHTS</Text>
            <Pressable style={styles.copyButton}>
              <CopyIcon />
              <Text style={styles.copyText}>Copy data</Text>
            </Pressable>
          </View>

          <View style={styles.insightsRow}>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>DATE PAID</Text>
              <Text style={styles.insightValue}>{receipt.datePaid.date}</Text>
              <Text style={styles.insightSub}>{receipt.datePaid.time}</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>DATE SCANNED</Text>
              <Text style={styles.insightValue}>{receipt.dateScanned.date}</Text>
              <Text style={styles.insightSub}>{receipt.dateScanned.time}</Text>
            </View>
          </View>

          <View style={styles.insightsRow}>
            <View style={styles.statCard}>
              <TagIcon size={14} color="#666666" />
              <Text style={styles.statValue}>{receipt.vatRate}</Text>
              <Text style={styles.statLabel}>VAT RATE</Text>
            </View>
            <View style={styles.statCard}>
              <ListIcon />
              <Text style={styles.statValue}>{receipt.items.length}</Text>
              <Text style={styles.statLabel}>ITEMS</Text>
            </View>
            <View style={styles.statCard}>
              <CardIcon />
              <Text style={styles.statValueSmall}>{receipt.paymentMethod}</Text>
              <Text style={styles.statLabel}>PAYMENT</Text>
            </View>
            <View style={styles.statCard}>
              <ShieldCheckIcon size={14} />
              <Text style={styles.statValueSmall}>{receipt.source}</Text>
              <Text style={styles.statLabel}>SOURCE</Text>
            </View>
          </View>
        </View>

        <KraFieldsTable fields={receipt.kraFields} />

        <CategoryRow category={receipt.category} />

        <ReceiptImageCard />

        <View style={styles.itemsBlock}>
          <View style={styles.itemsSection}>
            <View style={styles.itemsHeader}>
              <Text style={styles.eyebrow}>ITEMS</Text>
              <Text style={styles.itemsCount}>
                {receipt.items.length} item{receipt.items.length === 1 ? '' : 's'}
              </Text>
            </View>
            <View style={styles.itemsCard}>
              {receipt.items.map((item, index) => (
                <View
                  key={`${item.name}-${index}`}
                  style={[styles.itemRow, index !== receipt.items.length - 1 && styles.itemRowDivider]}
                >
                  <View style={styles.qtyPill}>
                    <Text style={styles.qtyText}>{item.qty}×</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemUnitPrice}>{item.unitPrice}</Text>
                  </View>
                  <View style={styles.itemTotalRow}>
                    <Text style={styles.itemTotal}>{item.total}</Text>
                    <PencilIcon />
                  </View>
                </View>
              ))}
              <View style={styles.subtotalRow}>
                <Text style={styles.subtotalLabel}>Items subtotal</Text>
                <Text style={styles.subtotalValue}>{receipt.itemsSubtotal}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.savingsText}>Total savings on this receipt: – {receipt.savings}</Text>
        </View>

        <View style={styles.notesBlock}>
          <View style={styles.notesHeader}>
            <Text style={styles.eyebrow}>NOTES</Text>
            <Pressable>
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.notesEmpty}>
            <Text style={styles.notesEmptyText}>{receipt.note ?? 'Tap Edit to add a note'}</Text>
          </View>
        </View>

        <Text style={styles.footerText}>{receipt.scannedAt}</Text>

        <Pressable style={styles.portalButton}>
          <Text style={styles.portalButtonText}>View this record on the KRA portal</Text>
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
    lineHeight: 22,
    color: '#666666',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 60,
    gap: 20,
  },
  eyebrow: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    color: colors.textMuted2,
  },
  insightsSection: {
    gap: 8,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  copyText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 16,
    color: colors.primary,
  },
  insightsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  insightCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 12,
    gap: 8,
  },
  insightLabel: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.3,
    color: colors.textMuted2,
  },
  insightValue: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.textBlack,
  },
  insightSub: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 15,
    color: colors.textMuted2,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    paddingVertical: 12,
    paddingHorizontal: 6,
    gap: 6,
  },
  statValue: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textBlack,
  },
  statValueSmall: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textBlack,
  },
  statLabel: {
    fontFamily: fonts.medium,
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 0.3,
    color: colors.textMuted2,
    textAlign: 'center',
  },
  itemsBlock: {
    gap: 4,
  },
  itemsSection: {
    gap: 4,
  },
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsCount: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  itemsCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    paddingHorizontal: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
  },
  itemRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  qtyPill: {
    backgroundColor: colors.fuelTagBg,
    borderRadius: radii.md,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  qtyText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.fuelTagText,
  },
  itemInfo: {
    flex: 1,
    gap: 3,
  },
  itemName: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textBlack,
  },
  itemUnitPrice: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  itemTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemTotal: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.textBlack,
  },
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  subtotalLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted3,
  },
  subtotalValue: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.textBlack,
  },
  savingsText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 17,
    color: colors.teal,
    textAlign: 'center',
  },
  notesBlock: {
    gap: 8,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 16,
    color: colors.primary,
  },
  notesEmpty: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
  },
  notesEmptyText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted2,
  },
  footerText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 15,
    color: colors.textMuted2,
    textAlign: 'center',
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
    lineHeight: 20,
    color: colors.primary,
  },
});
