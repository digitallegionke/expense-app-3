import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BanknoteIcon,
  BarChartIcon,
  CalculatorIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ExpandCornersIcon,
  ReceiptStackIcon,
  ShieldCheckIcon,
} from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';
import { receipts } from '../../constants/receipts';

const MONTH_ORDER = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const OCR_SCAN_LIMIT = 20;

function parseAmount(value: string): number {
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
}

function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function useYearData(year: number) {
  return useMemo(() => {
    const yearReceipts = receipts.filter((r) => r.datePaid.date.endsWith(String(year)));

    const totalSpend = yearReceipts.reduce((sum, r) => sum + parseAmount(r.amount), 0);
    const taxable = yearReceipts.reduce((sum, r) => sum + parseAmount(r.itemsSubtotal), 0);
    const vatPaid = yearReceipts.reduce((sum, r) => {
      const field = r.kraFields.find((f) => f.label === 'Total Tax Amount');
      return sum + (field ? parseAmount(field.value) : 0);
    }, 0);

    const monthTotals = new Map<string, number>();
    yearReceipts.forEach((r) => {
      const month = r.datePaid.date.split(' ')[1];
      monthTotals.set(month, (monthTotals.get(month) ?? 0) + parseAmount(r.amount));
    });
    const breakdown = MONTH_ORDER.filter((m) => monthTotals.has(m)).map((month) => ({
      month,
      amount: monthTotals.get(month)!,
    }));

    return { totalSpend, taxable, vatPaid, count: yearReceipts.length, breakdown };
  }, [year]);
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      {icon}
      <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function VatScreen() {
  const insets = useSafeAreaInsets();
  const [year, setYear] = useState(2026);
  const { totalSpend, taxable, vatPaid, count, breakdown } = useYearData(year);
  const maxAmount = Math.max(1, ...breakdown.map((b) => b.amount));
  const ocrUsed = Math.min(receipts.length, OCR_SCAN_LIMIT);
  const ocrMonthLabel = `${year}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 21 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>VAT Summary</Text>
          <Pressable style={styles.exportButton}>
            <DownloadIcon size={15} color={colors.primary} />
            <Text style={styles.exportText}>Export CSV</Text>
          </Pressable>
        </View>

        <View style={styles.yearRow}>
          <Pressable onPress={() => setYear((y) => y - 1)} hitSlop={12}>
            <ChevronLeftIcon size={22} color={colors.chevron} />
          </Pressable>
          <Text style={styles.year}>{year}</Text>
          <Pressable onPress={() => setYear((y) => y + 1)} hitSlop={12}>
            <ChevronRightIcon size={22} color={colors.chevron} />
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            icon={<BanknoteIcon size={16} color={colors.primary} />}
            value={formatKES(totalSpend)}
            label="TOTAL SPEND"
          />
          <StatCard
            icon={<CalculatorIcon size={16} color={colors.teal} />}
            value={formatKES(taxable)}
            label="TAXABLE (EXCL. VAT)"
          />
          <StatCard
            icon={<ShieldCheckIcon size={15} color={colors.warning} />}
            value={formatKES(vatPaid)}
            label="VAT PAID"
          />
          <StatCard
            icon={<ReceiptStackIcon size={16} color={colors.info} />}
            value={String(count)}
            label="RECEIPTS"
          />
        </View>

        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
          {breakdown.length === 0 ? (
            <View style={styles.emptyState}>
              <BarChartIcon size={36} color={colors.textMuted2} />
              <Text style={styles.emptyText}>No receipts found for {year}</Text>
            </View>
          ) : (
            <View style={styles.breakdownList}>
              {breakdown.map((row) => (
                <View key={row.month} style={styles.breakdownRow}>
                  <Text style={styles.breakdownMonth}>{row.month}</Text>
                  <View style={styles.breakdownBarTrack}>
                    <View
                      style={[
                        styles.breakdownBarFill,
                        { width: `${Math.max(6, (row.amount / maxAmount) * 100)}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.breakdownAmount}>{formatKES(row.amount)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.ocrCard}>
          <View style={styles.ocrHeader}>
            <View style={styles.ocrHeaderLeft}>
              <ExpandCornersIcon size={15} color={colors.primary} />
              <Text style={styles.ocrTitle}>OCR Usage — {ocrMonthLabel}</Text>
            </View>
            <View style={styles.planPill}>
              <Text style={styles.planPillText}>FREE</Text>
            </View>
          </View>
          <View style={styles.ocrTrack}>
            <View style={[styles.ocrFill, { width: `${(ocrUsed / OCR_SCAN_LIMIT) * 100}%` }]} />
          </View>
          <Text style={styles.ocrCaption}>
            {ocrUsed} / {OCR_SCAN_LIMIT} OCR scans used
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flexShrink: 1,
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 29,
    color: colors.textDark,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
    backgroundColor: colors.primaryTint2,
    borderRadius: radii.pill,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  exportText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.primary,
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  year: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 27,
    color: colors.textDark,
    minWidth: 64,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statCard: {
    flexBasis: '48%',
    flexGrow: 1,
    minWidth: 0,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: 8,
    gap: 6,
  },
  statValue: {
    fontFamily: fonts.monoSemibold,
    fontSize: 17,
    letterSpacing: -0.4,
    lineHeight: 23,
    color: colors.textBlack,
  },
  statLabel: {
    fontFamily: fonts.medium,
    fontSize: 9,
    letterSpacing: 0.3,
    lineHeight: 13,
    color: colors.textMuted2,
    textAlign: 'center',
  },
  breakdownSection: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textBlack,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 40,
    backgroundColor: colors.card,
    borderRadius: radii.md,
  },
  emptyText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted2,
  },
  breakdownList: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 14,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  breakdownMonth: {
    width: 34,
    flexShrink: 0,
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted3,
  },
  breakdownBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.divider2,
    overflow: 'hidden',
  },
  breakdownBarFill: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  breakdownAmount: {
    flexShrink: 0,
    fontFamily: fonts.monoMedium,
    fontSize: 13,
    letterSpacing: -0.3,
    lineHeight: 17,
    color: colors.textBlack,
    textAlign: 'right',
  },
  ocrCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 12,
  },
  ocrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  ocrHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
    minWidth: 0,
  },
  ocrTitle: {
    flexShrink: 1,
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textBlack,
  },
  planPill: {
    flexShrink: 0,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.cardOutline,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  planPillText: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.textMuted3,
  },
  ocrTrack: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.divider2,
    overflow: 'hidden',
  },
  ocrFill: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  ocrCaption: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted,
  },
});
