import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { Button } from '../../components/Button';
import { useStore } from '../../stores/useStore';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { changePassword } = useStore();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ current: '', new: '', confirm: '' });

  const validateForm = () => {
    const newErrors = { current: '', new: '', confirm: '' };
    let isValid = true;

    if (!currentPassword) {
      newErrors.current = 'Current password is required';
      isValid = false;
    }

    if (!newPassword) {
      newErrors.new = 'New password is required';
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.new = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirm = 'Please confirm your password';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirm = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await changePassword(newPassword);
        Alert.alert('Success', 'Password updated successfully');
        router.back();
      } catch (error) {
        Alert.alert('Error', 'Failed to update password. Please try again.');
      }
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
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.subtitle}>Update your account password</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Current Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.current ? styles.inputError : null,
                ]}
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text);
                  if (errors.current) setErrors({ ...errors, current: '' });
                }}
                placeholder="Enter current password"
                placeholderTextColor="#B3B3B3"
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff size={20} color="#828282" />
                ) : (
                  <Eye size={20} color="#828282" />
                )}
              </TouchableOpacity>
            </View>
            {errors.current ? (
              <Text style={styles.errorText}>{errors.current}</Text>
            ) : null}
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.new ? styles.inputError : null,
                ]}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  if (errors.new) setErrors({ ...errors, new: '' });
                }}
                placeholder="Enter new password"
                placeholderTextColor="#B3B3B3"
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff size={20} color="#828282" />
                ) : (
                  <Eye size={20} color="#828282" />
                )}
              </TouchableOpacity>
            </View>
            {errors.new ? (
              <Text style={styles.errorText}>{errors.new}</Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.confirm ? styles.inputError : null,
                ]}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirm) setErrors({ ...errors, confirm: '' });
                }}
                placeholder="Confirm new password"
                placeholderTextColor="#B3B3B3"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#828282" />
                ) : (
                  <Eye size={20} color="#828282" />
                )}
              </TouchableOpacity>
            </View>
            {errors.confirm ? (
              <Text style={styles.errorText}>{errors.confirm}</Text>
            ) : null}
          </View>

          {/* Password Requirements */}
          <View style={styles.requirementsBox}>
            <Text style={styles.requirementsTitle}>Password requirements:</Text>
            <View style={styles.requirementsList}>
              <Text style={styles.requirementItem}>• At least 6 characters</Text>
              <Text style={styles.requirementItem}>
                • Mix of letters and numbers recommended
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Update Password"
              onPress={handleSubmit}
              fullWidth
              size="lg"
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
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D3C40',
    marginBottom: 8,
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    height: 52,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#3D3C40',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  passwordInput: {
    paddingRight: 48,
  },
  inputError: {
    borderColor: '#B3261E',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#B3261E',
    marginTop: 6,
  },
  requirementsBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginTop: 4,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3D3C40',
    marginBottom: 8,
  },
  requirementsList: {
    gap: 4,
  },
  requirementItem: {
    fontSize: 13,
    color: '#828282',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
