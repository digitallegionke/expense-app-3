import { StyleSheet, Text, View } from 'react-native';
import { WarningTriangleIcon } from './icons';
import { colors, fonts, radii } from '../constants/theme';
import type { MismatchField } from '../constants/receipts';

export function MismatchFields({ note, fields }: { note?: string; fields: MismatchField[] }) {
  return (
    <View style={styles.section}>
      <View style={styles.intro}>
        <View style={styles.banner}>
          <WarningTriangleIcon />
          <Text style={styles.bannerText}>{fields.length} fields differ from KRA</Text>
        </View>
        {note && <Text style={styles.note}>{note}</Text>}
      </View>
      <View>
        {fields.map((field) => (
          <View key={field.label} style={styles.row}>
            {field.layout === 'text' ? (
              <>
                <Text style={styles.label}>{field.label}</Text>
                <View style={styles.stackedBlock}>
                  <Text style={styles.source}>as per Receipt:</Text>
                  <Text style={styles.valueStacked}>{field.receiptValue}</Text>
                </View>
                <View style={styles.stackedBlock}>
                  <Text style={styles.source}>as per KRA</Text>
                  <Text style={styles.valueStacked}>{field.kraValue}</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>{field.label}</Text>
                <View style={styles.inlineRow}>
                  <Text style={styles.source}>as per Receipt:</Text>
                  <Text style={styles.value}>{field.receiptValue}</Text>
                </View>
                <View style={styles.inlineRow}>
                  <Text style={styles.source}>as per KRA</Text>
                  <Text style={styles.value}>{field.kraValue}</Text>
                </View>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 12,
    gap: 15,
  },
  intro: {
    gap: 11,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.warningTintLight,
    borderRadius: 4,
    padding: 12,
  },
  bannerText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.warning,
  },
  note: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
  },
  row: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingVertical: 10,
    gap: 8,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted3,
  },
  stackedBlock: {
    gap: 5,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  source: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted4,
  },
  value: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textBlack,
    textAlign: 'right',
  },
  valueStacked: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textBlack,
  },
});
