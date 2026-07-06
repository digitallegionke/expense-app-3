import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationPreferences {
  pushNotifications: boolean;
  emailNotifications: boolean;
  expenseAlerts: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
  budgetAlerts: boolean;
}

const NOTIFICATION_PREFERENCES_KEY = '@notification_preferences';

const DEFAULT_PREFERENCES: NotificationPreferences = {
  pushNotifications: true,
  emailNotifications: true,
  expenseAlerts: true,
  weeklyReports: false,
  monthlyReports: true,
  budgetAlerts: true,
};

export const notificationPreferencesStorage = {
  async load(): Promise<NotificationPreferences> {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATION_PREFERENCES_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
      return DEFAULT_PREFERENCES;
    } catch (error) {
      console.error('Error loading notification preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  },

  async save(preferences: NotificationPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      throw error;
    }
  },
};
