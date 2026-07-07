import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackArrowIcon, EyeIcon, EyeOffIcon } from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';
import { useStore } from '../../stores/useStore';

export default function ChangePasswordScreen() {
  const insets = useSafeAreaInsets();
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
    <View style={styles.screen}>
      <View style={[styles.toolbar, { paddingTop: insets.top + 10 }]}>
        <Pressable style={styles.toolbarButton} onPress={() => router.back()}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.toolbarTitle} numberOfLines={1}>
          Change Password
        </Text>
        <View style={styles.toolbarButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.current ? styles.inputError : null]}
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text);
                  if (errors.current) setErrors({ ...errors, current: '' });
                }}
                placeholder="Enter current password"
                placeholderTextColor={colors.textMuted2}
                secureTextEntry={!showCurrentPassword}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOffIcon size={20} color={colors.textMuted4} />
                ) : (
                  <EyeIcon size={20} color={colors.textMuted4} />
                )}
              </Pressable>
            </View>
            {errors.current ? <Text style={styles.errorText}>{errors.current}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.new ? styles.inputError : null]}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  if (errors.new) setErrors({ ...errors, new: '' });
                }}
                placeholder="Enter new password"
                placeholderTextColor={colors.textMuted2}
                secureTextEntry={!showNewPassword}
              />
              <Pressable style={styles.eyeButton} onPress={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? (
                  <EyeOffIcon size={20} color={colors.textMuted4} />
                ) : (
                  <EyeIcon size={20} color={colors.textMuted4} />
                )}
              </Pressable>
            </View>
            {errors.new ? <Text style={styles.errorText}>{errors.new}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.confirm ? styles.inputError : null]}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirm) setErrors({ ...errors, confirm: '' });
                }}
                placeholder="Confirm new password"
                placeholderTextColor={colors.textMuted2}
                secureTextEntry={!showConfirmPassword}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={20} color={colors.textMuted4} />
                ) : (
                  <EyeIcon size={20} color={colors.textMuted4} />
                )}
              </Pressable>
            </View>
            {errors.confirm ? <Text style={styles.errorText}>{errors.confirm}</Text> : null}
          </View>

          <View style={styles.requirementsBox}>
            <Text style={styles.requirementsTitle}>Password requirements:</Text>
            <View style={styles.requirementsList}>
              <Text style={styles.requirementItem}>• At least 6 characters</Text>
              <Text style={styles.requirementItem}>• Mix of letters and numbers recommended</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Update Password</Text>
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
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textDark,
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    height: 52,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textBlack,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  passwordInput: {
    paddingRight: 48,
  },
  inputError: {
    borderColor: colors.danger,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  errorText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.danger,
  },
  requirementsBox: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 8,
  },
  requirementsTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textDark,
  },
  requirementsList: {
    gap: 4,
  },
  requirementItem: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted2,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.white,
  },
});
