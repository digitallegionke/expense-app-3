import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronDownIcon, TagIcon } from './icons';
import { colors, fonts, radii } from '../constants/theme';

export function CategoryRow({ category }: { category: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>CATEGORY</Text>
      <Pressable style={styles.row}>
        <View style={styles.left}>
          <TagIcon />
          <Text style={styles.value}>{category}</Text>
        </View>
        <ChevronDownIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    color: colors.textMuted2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  value: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textBlack,
  },
});
