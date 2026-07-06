import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { Button } from '../../components/Button';
import { Picker } from '@react-native-picker/picker';
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
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>('light');
  const [accentColor, setAccentColor] = useState('#69508C');
  const [currency, setCurrency] = useState('KES');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load preferences on mount
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
    { value: '#69508C', label: 'Purple' },
    { value: '#4285F4', label: 'Blue' },
    { value: '#34A853', label: 'Green' },
    { value: '#EA4335', label: 'Red' },
    { value: '#FBBC04', label: 'Yellow' },
    { value: '#FF6D00', label: 'Orange' },
  ];

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await appearanceStorage.save({
        theme,
        accentColor,
        currency,
      });
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
            <Text style={styles.title}>Appearance</Text>
            <Text style={styles.subtitle}>Customize how the app looks</Text>
          </View>
        </View>

        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THEME</Text>
          <View style={styles.themeOptions}>
            {themes.map((themeOption) => (
              <TouchableOpacity
                key={themeOption.value}
                style={[
                  styles.themeOption,
                  theme === themeOption.value && styles.themeOptionSelected,
                ]}
                onPress={() => setTheme(themeOption.value)}
              >
                <View style={styles.themeContent}>
                  <Text style={styles.themeLabel}>{themeOption.label}</Text>
                  <Text style={styles.themeDescription}>{themeOption.description}</Text>
                </View>
                {theme === themeOption.value && (
                  <View style={styles.checkCircle}>
                    <Check size={16} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accent Color */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCENT COLOR</Text>
          <View style={styles.accentColorCard}>
            <Text style={styles.accentColorDescription}>
              Choose your preferred accent color
            </Text>
            <View style={styles.colorGrid}>
              {accentColors.map((color) => (
                <TouchableOpacity
                  key={color.value}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color.value },
                    accentColor === color.value && styles.colorButtonSelected,
                  ]}
                  onPress={() => setAccentColor(color.value)}
                >
                  {accentColor === color.value && (
                    <Check size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DISPLAY</Text>
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

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isSaving ? "Saving..." : "Save Changes"}
            onPress={handleSave}
            fullWidth
            size="lg"
            disabled={isSaving || isLoading}
          />
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
  themeOptions: {
    gap: 8,
  },
  themeOption: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: '#69508C',
  },
  themeContent: {
    flex: 1,
  },
  themeLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3C40',
  },
  themeDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: '#828282',
    marginTop: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#69508C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentColorCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  accentColorDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: '#828282',
    marginBottom: 16,
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
    borderColor: '#3D3C40',
  },
  displayCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  displayTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3C40',
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
  },
  buttonContainer: {
    marginTop: 8,
  },
});
