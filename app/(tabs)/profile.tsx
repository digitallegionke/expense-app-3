import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  BellIcon,
  ChevronRightIcon,
  FileTextIcon,
  HelpCircleIcon,
  LockIcon,
  LogOutIcon,
  PaletteIcon,
  UserIcon,
} from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';
import { useStore } from '../../stores/useStore';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  danger?: boolean;
}

function SettingsItem({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  danger = false,
}: SettingsItemProps) {
  return (
    <Pressable style={styles.settingsItem} onPress={onPress}>
      <View style={[styles.iconContainer, danger && styles.iconContainerDanger]}>{icon}</View>
      <View style={styles.settingsItemContent}>
        <Text style={[styles.settingsItemTitle, danger && styles.dangerText]}>{title}</Text>
        {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && <ChevronRightIcon size={20} color={colors.chevron} />}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          router.replace('/signin');
          setTimeout(() => {
            logout();
          }, 100);
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 21 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your account and preferences</Text>
        </View>

        <Pressable onPress={() => router.push('/settings/edit-profile')}>
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>{user.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email || 'No email set'}</Text>
            </View>
            <ChevronRightIcon size={20} color={colors.chevron} />
          </View>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <SettingsItem
              icon={<UserIcon size={20} color={colors.primary} />}
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => router.push('/settings/edit-profile')}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon={<LockIcon size={20} color={colors.primary} />}
              title="Change Password"
              subtitle="Update your password"
              onPress={() => router.push('/settings/change-password')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <SettingsItem
              icon={<BellIcon size={20} color={colors.primary} />}
              title="Notifications"
              subtitle="Manage notification settings"
              onPress={() => router.push('/settings/notifications')}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon={<PaletteIcon size={20} color={colors.primary} />}
              title="Appearance"
              subtitle="Customize app theme"
              onPress={() => router.push('/settings/appearance')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <SettingsItem
              icon={<HelpCircleIcon size={20} color={colors.primary} />}
              title="Help & Support"
              subtitle="Get help and contact us"
              onPress={() => router.push('/settings/help-support')}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon={<FileTextIcon size={20} color={colors.primary} />}
              title="Terms & Privacy"
              subtitle="Read our policies"
              onPress={() => router.push('/settings/terms-privacy')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <SettingsItem
              icon={<LogOutIcon size={20} color={colors.danger} />}
              title="Sign Out"
              onPress={handleLogout}
              showChevron={false}
              danger
            />
          </View>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
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
    paddingBottom: 120,
    gap: 24,
  },
  header: {
    gap: 4,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 29,
    color: colors.textDark,
  },
  headerSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted4,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 14,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: radii.round,
    backgroundColor: colors.primaryTint2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.primary,
  },
  profileInfo: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textBlack,
  },
  profileEmail: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted2,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textMuted2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerDanger: {
    backgroundColor: '#FEF2F2',
  },
  settingsItemContent: {
    flex: 1,
    gap: 2,
  },
  settingsItemTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textBlack,
  },
  settingsItemSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  dangerText: {
    color: colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider2,
    marginLeft: 66,
  },
  version: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
});
