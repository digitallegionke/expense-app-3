import { StyleSheet, Text, View } from 'react-native';
import { CheckCircleIcon } from './icons';
import { colors, fonts, radii } from '../constants/theme';
import type { Receipt } from '../constants/receipts';

export function KraFieldsTable({ fields }: { fields: Receipt['kraFields'] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>KRA E-Tims Fields</Text>
      <View style={styles.card}>
        {fields.map((field, index) => (
          <View key={field.label} style={[styles.row, index !== fields.length - 1 && styles.rowDivider]}>
            <Text style={[styles.label, field.bold && styles.labelBold]}>{field.label}</Text>
            <View style={styles.valueRow}>
              {field.verified && <CheckCircleIcon />}
              <Text style={styles.value}>{field.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textBlack,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 10,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  label: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textMuted3,
  },
  labelBold: {
    fontFamily: fonts.bold,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  value: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textBlack,
    textAlign: 'right',
    flexShrink: 1,
  },
});
