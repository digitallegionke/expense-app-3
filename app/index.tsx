import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useStore } from '../stores/useStore';

export default function Index() {
  const user = useStore((state) => state.user);

  // Check authentication state and redirect accordingly
  if (!user.hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!user.isAuthenticated) {
    return <Redirect href="/signin" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
