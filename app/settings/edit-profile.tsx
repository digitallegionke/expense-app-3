import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackArrowIcon, CameraIcon } from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';
import { useStore } from '../../stores/useStore';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, updateProfile, initialize } = useStore();

  const [name, setName] = useState(user.name === 'User' || user.name.includes('@') ? '' : user.name);
  const [email, setEmail] = useState(user.email || '');
  const [errors, setErrors] = useState({ name: '', email: '' });

  React.useEffect(() => {
    const displayName = user.name === 'User' || user.name.includes('@') ? '' : user.name;
    setName(displayName);
    setEmail(user.email || '');
  }, [user.name, user.email]);

  const validateForm = () => {
    const newErrors = { name: '', email: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await updateProfile(name.trim(), email);
        await initialize();
        Alert.alert('Success', 'Profile updated successfully');
        router.back();
      } catch (error) {
        console.error('Profile update error:', error);
        Alert.alert('Error', 'Failed to update profile. Please try again.');
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
          Edit Profile
        </Text>
        <View style={styles.toolbarButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(name || 'U').charAt(0).toUpperCase()}</Text>
          </View>
          <Pressable style={styles.cameraButton}>
            <CameraIcon size={16} color={colors.white} />
          </Pressable>
        </View>

        {!name && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Please enter your name to personalize your profile</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textMuted2}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.textMuted2}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  avatarSection: {
    alignItems: 'center',
    marginTop: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryTint2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.bold,
    fontSize: 36,
    color: colors.primary,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '38%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    backgroundColor: colors.primaryTint,
    borderRadius: radii.md,
    padding: 16,
  },
  infoText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color: colors.primary,
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
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.danger,
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
