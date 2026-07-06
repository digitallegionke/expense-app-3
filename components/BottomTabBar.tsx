import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CoinsTabIcon, HomeTabIcon, ProfileTabIcon, ReceiptTabIcon } from './icons';
import { colors, fonts } from '../constants/theme';

const ICONS: Record<string, (active: boolean) => ReactNode> = {
  home: (active) => <HomeTabIcon color={active ? colors.primary : colors.primary} />,
  receipts: (active) => <ReceiptTabIcon color={colors.primary} bg={active ? '#B9B0DA' : '#DEDBF1'} />,
  vat: (active) => <CoinsTabIcon color={colors.primary} bg={active ? '#B9B0DA' : '#DEDBF1'} />,
  profile: (active) => <ProfileTabIcon color={colors.primary} bg={active ? '#B9B0DA' : '#DEDBF1'} />,
};

const LABELS: Record<string, string> = {
  home: 'Home',
  receipts: 'Receipts',
  vat: 'VAT',
  profile: 'Profile',
};

export function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 15) }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const label = LABELS[route.name] ?? route.name;
        const renderIcon = ICONS[route.name];

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab}>
            <View style={{ opacity: isFocused ? 1 : 0.7 }}>{renderIcon?.(isFocused)}</View>
            <Text style={[styles.label, { opacity: isFocused ? 1 : 0.7 }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E6E6E6',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 15,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    lineHeight: 12,
    color: colors.primary,
    textAlign: 'center',
  },
});
