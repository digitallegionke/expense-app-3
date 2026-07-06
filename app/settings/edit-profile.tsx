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
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useStore } from '../../stores/useStore';
import { Button } from '../../components/Button';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateProfile, initialize } = useStore();

  const [name, setName] = useState(user.name === 'User' || user.name.includes('@') ? '' : user.name);
  const [email, setEmail] = useState(user.email || '');
  const [errors, setErrors] = useState({ name: '', email: '' });

  // Update form when user data changes
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
        // Refresh user data to get the updated name
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
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>Update your personal information</Text>
          </View>
        </View>

        {/* Profile Picture */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {!name && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                👋 Please enter your name to personalize your profile
              </Text>
            </View>
          )}

          {/* Name Input */}
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
              placeholderTextColor="#B3B3B3"
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          {/* Email Input */}
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
              placeholderTextColor="#B3B3B3"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Save Changes"
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(103, 92, 168, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#675CA8',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '38%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#69508C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    gap: 20,
  },
  infoBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4F46E5',
    lineHeight: 20,
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
  inputError: {
    borderColor: '#B3261E',
  },
  errorText: {
    fontSize: 13,
    color: '#B3261E',
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
