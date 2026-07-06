import { StyleSheet, Text, View } from 'react-native';
import { ExpandCornersIcon } from './icons';
import { colors, fonts } from '../constants/theme';

export function ReceiptImageCard() {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Receipt Image</Text>
      <View style={styles.card}>
        <View style={styles.paper}>
          <View style={[styles.line, styles.lineBold, { width: 100 }]} />
          <View style={[styles.line, { width: 140, marginTop: 8 }]} />
          <View style={[styles.line, { width: 120 }]} />
          <View style={[styles.line, { width: 150 }]} />
          <View style={[styles.line, styles.lineBold, { width: 90, marginTop: 10 }]} />
          <View style={[styles.line, { width: 140, marginTop: 8 }]} />
          <View style={[styles.line, { width: 130 }]} />
          <View style={[styles.line, { width: 110 }]} />
          <View style={styles.stamp} />
        </View>
        <View style={styles.hint}>
          <ExpandCornersIcon />
          <Text style={styles.hintText}>Tap to view full receipt</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted3,
  },
  card: {
    height: 260,
    borderRadius: 8,
    backgroundColor: '#B08B5C',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  paper: {
    position: 'absolute',
    top: 8,
    left: 80,
    width: 210,
    height: 280,
    backgroundColor: '#FAFAF6',
    borderRadius: 3,
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 7,
    transform: [{ rotate: '-2deg' }],
  },
  line: {
    height: 4,
    borderRadius: 1,
    backgroundColor: '#E4E2DA',
  },
  lineBold: {
    height: 6,
    backgroundColor: '#D8D5CC',
  },
  stamp: {
    width: 60,
    height: 60,
    marginTop: 16,
    borderRadius: 2,
    backgroundColor: '#38352E',
  },
  hint: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0000008C',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  hintText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 15,
    color: colors.white,
  },
});
