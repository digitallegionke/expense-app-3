import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  User,
  Lock,
  Bell,
  Palette,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { useStore } from '../../stores/useStore';
import { Card } from '../../components/Card';

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
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={[styles.iconContainer, danger && styles.iconContainerDanger]}>
        {icon}
      </View>
      <View style={styles.settingsItemContent}>
        <Text style={[styles.settingsItemTitle, danger && styles.dangerText]}>
          {title}
        </Text>
        {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && <ChevronRight size={20} color="#C0C0C0" />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useStore();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            // Navigate first, then logout to prevent glitching
            router.replace('/signin');
            // Small delay to ensure navigation happens first
            setTimeout(() => {
              logout();
            }, 100);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your account and preferences</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <TouchableOpacity
          onPress={() => router.push('/settings/edit-profile')}
          activeOpacity={0.7}
        >
          <Card style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email || 'No email set'}</Text>
            </View>
            <ChevronRight size={20} color="#C0C0C0" />
          </Card>
        </TouchableOpacity>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card padding="none">
            <SettingsItem
              icon={<User size={20} color="#69508C" />}
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => router.push('/settings/edit-profile')}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon={<Lock size={20} color="#69508C" />}
              title="Change Password"
              subtitle="Update your password"
              onPress={() => router.push('/settings/change-password')}
            />
          </Card>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card padding="none">
            <SettingsItem
              icon={<Bell size={20} color="#69508C" />}
              title="Notifications"
              subtitle="Manage notification settings"
              onPress={() => router.push('/settings/notifications')}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon={<Palette size={20} color="#69508C" />}
              title="Appearance"
              subtitle="Customize app theme"
              onPress={() => router.push('/settings/appearance')}
            />
          </Card>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Card padding="none">
            <SettingsItem
              icon={<HelpCircle size={20} color="#69508C" />}
              title="Help & Support"
              subtitle="Get help and contact us"
              onPress={() => router.push('/settings/help-support')}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon={<FileText size={20} color="#69508C" />}
              title="Terms & Privacy"
              subtitle="Read our policies"
              onPress={() => router.push('/settings/terms-privacy')}
            />
          </Card>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <Card padding="none">
            <SettingsItem
              icon={<LogOut size={20} color="#EF4444" />}
              title="Sign Out"
              onPress={handleLogout}
              showChevron={false}
              danger
            />
          </Card>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3D3C40',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#828282',
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 32,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(103, 92, 168, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: '600',
    color: '#675CA8',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1F',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#79747E',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#79747E',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerDanger: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  settingsItemContent: {
    flex: 1,
    marginLeft: 14,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1F',
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 13,
    color: '#79747E',
    marginTop: 2,
  },
  dangerText: {
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 68,
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: '#A0A0A0',
    marginTop: 16,
    fontWeight: '500',
  },
});
