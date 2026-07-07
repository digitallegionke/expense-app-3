import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { BackArrowIcon, CheckIcon } from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';
import { appearanceStorage, Theme } from '../../utils/appearanceStorage';

interface ThemeOption {
  value: Theme;
  label: string;
  description: string;
}

interface AccentColor {
  value: string;
  label: string;
}

export default function AppearanceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>('light');
  const [accentColor, setAccentColor] = useState<string>(colors.primary);
  const [currency, setCurrency] = useState('KES');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const preferences = await appearanceStorage.load();
      setTheme(preferences.theme);
      setAccentColor(preferences.accentColor);
      setCurrency(preferences.currency);
    } catch (error) {
      console.error('Error loading preferences:', error);
      Alert.alert('Error', 'Failed to load appearance preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const themes: ThemeOption[] = [
    { value: 'light', label: 'Light', description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark', description: 'Easy on the eyes' },
    { value: 'auto', label: 'Auto', description: 'Follows system settings' },
  ];

  const accentColors: AccentColor[] = [
    { value: colors.primary, label: 'Purple' },
    { value: '#4285F4', label: 'Blue' },
    { value: colors.teal, label: 'Green' },
    { value: colors.danger, label: 'Red' },
    { value: '#FBBC04', label: 'Yellow' },
    { value: colors.warning, label: 'Orange' },
  ];

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await appearanceStorage.save({ theme, accentColor, currency });
      Alert.alert('Success', 'Appearance settings saved successfully');
      router.back();
    } catch (error) {
      console.error('Error saving preferences:', error);
      Alert.alert('Error', 'Failed to save appearance settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.toolbar, { paddingTop: insets.top + 10 }]}>
        <Pressable style={styles.toolbarButton} onPress={() => router.back()}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.toolbarTitle} numberOfLines={1}>
          Appearance
        </Text>
        <View style={styles.toolbarButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.themeOptions}>
            {themes.map((themeOption) => (
              <Pressable
                key={themeOption.value}
                style={[styles.themeOption, theme === themeOption.value && styles.themeOptionSelected]}
                onPress={() => setTheme(themeOption.value)}
              >
                <View style={styles.themeContent}>
                  <Text style={styles.themeLabel}>{themeOption.label}</Text>
                  <Text style={styles.themeDescription}>{themeOption.description}</Text>
                </View>
                {theme === themeOption.value && (
                  <View style={styles.checkCircle}>
                    <CheckIcon size={14} color={colors.white} />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accent Color</Text>
          <View style={styles.accentColorCard}>
            <Text style={styles.accentColorDescription}>Choose your preferred accent color</Text>
            <View style={styles.colorGrid}>
              {accentColors.map((color) => (
                <Pressable
                  key={color.value}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color.value },
                    accentColor === color.value && styles.colorButtonSelected,
                  ]}
                  onPress={() => setAccentColor(color.value)}
                >
                  {accentColor === color.value && <CheckIcon size={18} color={colors.white} />}
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          <View style={styles.displayCard}>
            <Text style={styles.displayTitle}>Currency Format</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currency}
                onValueChange={(itemValue) => setCurrency(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="$ USD - US Dollar" value="USD" />
                <Picker.Item label="€ EUR - Euro" value="EUR" />
                <Picker.Item label="£ GBP - British Pound" value="GBP" />
                <Picker.Item label="¥ JPY - Japanese Yen" value="JPY" />
                <Picker.Item label="KSh KES - Kenyan Shilling" value="KES" />
              </Picker>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.saveButton, (isSaving || isLoading) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving || isLoading}
        >
          <Text style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Save Changes'}</Text>
        </Pressable>
      </ScrollView>
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
  themeOptions: {
    gap: 8,
  },
  themeOption: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: colors.primary,
  },
  themeContent: {
    flex: 1,
    gap: 2,
  },
  themeLabel: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textBlack,
  },
  themeDescription: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentColorCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 16,
  },
  accentColorDescription: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorButtonSelected: {
    borderWidth: 2,
    borderColor: colors.textDark,
  },
  displayCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 12,
  },
  displayTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textBlack,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.white,
  },
});
