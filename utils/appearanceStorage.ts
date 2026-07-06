import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark' | 'auto';

export interface AppearancePreferences {
  theme: Theme;
  accentColor: string;
  currency: string;
}

const APPEARANCE_STORAGE_KEY = '@appearance_preferences';

const DEFAULT_PREFERENCES: AppearancePreferences = {
  theme: 'light',
  accentColor: '#69508C',
  currency: 'KES',
};

export const appearanceStorage = {
  /**
   * Load appearance preferences from AsyncStorage
   */
  async load(): Promise<AppearancePreferences> {
    try {
      const storedPreferences = await AsyncStorage.getItem(APPEARANCE_STORAGE_KEY);
      if (storedPreferences) {
        return JSON.parse(storedPreferences);
      }
      return DEFAULT_PREFERENCES;
    } catch (error) {
      console.error('Error loading appearance preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  },

  /**
   * Save appearance preferences to AsyncStorage
   */
  async save(preferences: AppearancePreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving appearance preferences:', error);
      throw error;
    }
  },

  /**
   * Clear appearance preferences (reset to defaults)
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(APPEARANCE_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing appearance preferences:', error);
      throw error;
    }
  },
};
