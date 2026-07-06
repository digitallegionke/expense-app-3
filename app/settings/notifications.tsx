import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <Switch
      value={enabled}
      onValueChange={onChange}
      trackColor={{ false: '#B3B3B3', true: '#69508C' }}
      thumbColor="#FFFFFF"
      ios_backgroundColor="#B3B3B3"
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
  const router = useRouter();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [expenseAlerts, setExpenseAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [monthlyReports, setMonthlyReports] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [loading, setLoading] = useState(true);

  const updateNotificationPreference = async (key: string, value: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ [key]: value })
      .eq('id', (await supabase.auth.getSession()).data.session?.user.id);

    if (error) {
      console.error(`Error updating ${key} preference:`, error);
    }
  };

  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'push_notifications_enabled, email_notifications_enabled, expense_alerts_enabled, weekly_reports_enabled, monthly_reports_enabled, budget_alerts_enabled'
        )
        .single();

      if (error) {
        console.error('Error fetching notification preferences:', error);
        // Set default values if there's an error fetching
        setPushNotifications(true);
        setEmailNotifications(true);
        setExpenseAlerts(true);
        setWeeklyReports(false);
        setMonthlyReports(true);
        setBudgetAlerts(true);
      } else if (data) {
        setPushNotifications(data.push_notifications_enabled);
        setEmailNotifications(data.email_notifications_enabled);
        setExpenseAlerts(data.expense_alerts_enabled);
        setWeeklyReports(data.weekly_reports_enabled);
        setMonthlyReports(data.monthly_reports_enabled);
        setBudgetAlerts(data.budget_alerts_enabled);
      }
      setLoading(false);
    };

    fetchNotificationPreferences();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading preferences...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#69508C" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>Manage how you receive updates</Text>
          </View>
        </View>

        {/* General Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL</Text>
          <View style={styles.card}>
            <NotificationItem
              title="Push Notifications"
              description="Receive push notifications on your device"
              enabled={pushNotifications}
              onChange={(value) => {
                setPushNotifications(value);
                updateNotificationPreference('push_notifications_enabled', value);
              }}
            />
            <View style={styles.divider} />
            <NotificationItem
              title="Email Notifications"
              description="Receive updates via email"
              enabled={emailNotifications}
              onChange={(value) => {
                setEmailNotifications(value);
                updateNotificationPreference('email_notifications_enabled', value);
              }}
            />
          </View>
        </View>

        {/* Expense Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPENSE ALERTS</Text>
          <View style={styles.card}>
            <NotificationItem
              title="New Expenses"
              description="Get notified when expenses are added"
              enabled={expenseAlerts}
              onChange={(value) => {
                setExpenseAlerts(value);
                updateNotificationPreference('expense_alerts_enabled', value);
              }}
            />
            <View style={styles.divider} />
            <NotificationItem
              title="Budget Alerts"
              description="Alert when approaching budget limits"
              enabled={budgetAlerts}
              onChange={(value) => {
                setBudgetAlerts(value);
                updateNotificationPreference('budget_alerts_enabled', value);
              }}
            />
          </View>
        </View>

        {/* Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REPORTS</Text>
          <View style={styles.card}>
            <NotificationItem
              title="Weekly Summary"
              description="Receive weekly expense summaries"
              enabled={weeklyReports}
              onChange={(value) => {
                setWeeklyReports(value);
                updateNotificationPreference('weekly_reports_enabled', value);
              }}
            />
            <View style={styles.divider} />
            <NotificationItem
              title="Monthly Summary"
              description="Receive monthly expense summaries"
              enabled={monthlyReports}
              onChange={(value) => {
                setMonthlyReports(value);
                updateNotificationPreference('monthly_reports_enabled', value);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3D3C40',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#828282',
    fontWeight: '400',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#828282',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
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
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3C40',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: '#828282',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#3D3C40',
  },
});
