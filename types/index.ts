export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: 'Food & Dining'
  | 'Transportation'
  | 'Bills & Utilities'
  | 'Shopping'
  | 'Health & Fitness'
  | 'Travel'
  | 'Entertainment'
  | 'Personal Care'
  | 'Education'
  | 'Other';
  date: Date;
  receiptUrl: string | null;
}

export interface Notification {
  id: string;
  type: 'expense' | 'budget' | 'report' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface User {
  name: string;
  email: string;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
}

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Expenses: undefined;
  Settings: undefined;
};

export type SettingsStackParamList = {
  SettingsMain: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Notifications: undefined;
  Appearance: undefined;
  Help: undefined;
  Terms: undefined;
};
