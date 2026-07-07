import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackArrowIcon } from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';
import { notificationPreferencesStorage } from '../../utils/notificationPreferencesStorage';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <Switch
      value={enabled}
      onValueChange={onChange}
      trackColor={{ false: colors.divider2, true: colors.primary }}
      thumbColor={colors.white}
      ios_backgroundColor={colors.divider2}
    />
  );
}

interface NotificationItemProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function NotificationItem({ title, description, enabled, onChange }: NotificationItemProps) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
      </View>
      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </View>
  );
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [expenseAlerts, setExpenseAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [monthlyReports, setMonthlyReports] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [loading, setLoading] = useState(true);

  const updateNotificationPreference = async (
    key: keyof Awaited<ReturnType<typeof notificationPreferencesStorage.load>>,
    value: boolean
  ) => {
    try {
      const current = await notificationPreferencesStorage.load();
      await notificationPreferencesStorage.save({ ...current, [key]: value });
    } catch (error) {
      console.error(`Error updating ${key} preference:`, error);
    }
  };

  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      const preferences = await notificationPreferencesStorage.load();
      setPushNotifications(preferences.pushNotifications);
      setEmailNotifications(preferences.emailNotifications);
      setExpenseAlerts(preferences.expenseAlerts);
      setWeeklyReports(preferences.weeklyReports);
      setMonthlyReports(preferences.monthlyReports);
      setBudgetAlerts(preferences.budgetAlerts);
      setLoading(false);
    };

    fetchNotificationPreferences();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={[styles.toolbar, { paddingTop: insets.top + 10 }]}>
        <Pressable style={styles.toolbarButton} onPress={() => router.back()}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.toolbarTitle} numberOfLines={1}>
          Notifications
        </Text>
        <View style={styles.toolbarButton} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading preferences...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            <View style={styles.card}>
              <NotificationItem
                title="Push Notifications"
                description="Receive push notifications on your device"
                enabled={pushNotifications}
                onChange={(value) => {
                  setPushNotifications(value);
                  updateNotificationPreference('pushNotifications', value);
                }}
              />
              <View style={styles.divider} />
              <NotificationItem
                title="Email Notifications"
                description="Receive updates via email"
                enabled={emailNotifications}
                onChange={(value) => {
                  setEmailNotifications(value);
                  updateNotificationPreference('emailNotifications', value);
                }}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expense Alerts</Text>
            <View style={styles.card}>
              <NotificationItem
                title="New Expenses"
                description="Get notified when expenses are added"
                enabled={expenseAlerts}
                onChange={(value) => {
                  setExpenseAlerts(value);
                  updateNotificationPreference('expenseAlerts', value);
                }}
              />
              <View style={styles.divider} />
              <NotificationItem
                title="Budget Alerts"
                description="Alert when approaching budget limits"
                enabled={budgetAlerts}
                onChange={(value) => {
                  setBudgetAlerts(value);
                  updateNotificationPreference('budgetAlerts', value);
                }}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reports</Text>
            <View style={styles.card}>
              <NotificationItem
                title="Weekly Summary"
                description="Receive weekly expense summaries"
                enabled={weeklyReports}
                onChange={(value) => {
                  setWeeklyReports(value);
                  updateNotificationPreference('weeklyReports', value);
                }}
              />
              <View style={styles.divider} />
              <NotificationItem
                title="Monthly Summary"
                description="Receive monthly expense summaries"
                enabled={monthlyReports}
                onChange={(value) => {
                  setMonthlyReports(value);
                  updateNotificationPreference('monthlyReports', value);
                }}
              />
            </View>
          </View>
        </ScrollView>
      )}
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
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.semibold,
    fontSize: 20,
    letterSpacing: -0.43,
    lineHeight: 27,
    color: colors.textMuted3,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 60,
    gap: 24,
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  notificationContent: {
    flex: 1,
    gap: 2,
  },
  notificationTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textBlack,
  },
  notificationDescription: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider2,
    marginHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textDark,
  },
});
