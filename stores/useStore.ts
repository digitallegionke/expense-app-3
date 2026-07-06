import { create } from 'zustand';
import { Transaction, Notification, User } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCOUNT_KEY = 'account';
const SESSION_KEY = 'hasSession';
const TRANSACTIONS_KEY = 'transactions';
const NOTIFICATIONS_KEY = 'notifications';

interface Account {
  name: string;
  email: string;
  password: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function loadAccount(): Promise<Account | null> {
  const stored = await AsyncStorage.getItem(ACCOUNT_KEY);
  return stored ? JSON.parse(stored) : null;
}

async function saveAccount(account: Account): Promise<void> {
  await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
}

async function loadTransactions(): Promise<Transaction[]> {
  const stored = await AsyncStorage.getItem(TRANSACTIONS_KEY);
  if (!stored) return [];
  const parsed = JSON.parse(stored);
  return parsed.map((t: any) => ({ ...t, date: new Date(t.date) }));
}

async function saveTransactions(transactions: Transaction[]): Promise<void> {
  await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

async function loadNotifications(): Promise<Notification[]> {
  const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
  if (!stored) return [];
  const parsed = JSON.parse(stored);
  return parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) }));
}

async function saveNotifications(notifications: Notification[]): Promise<void> {
  await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

interface AppState {
  // User
  user: User;
  setUser: (user: Partial<User>) => void;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  updateProfile: (name: string, email: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  logout: () => Promise<void>;

  // Loading states
  isLoading: boolean;
  isInitialized: boolean;

  // Transactions
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  // Notifications
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;

  // UI State
  isAddModalOpen: boolean;
  setAddModalOpen: (open: boolean) => void;

  // Initialization
  initialize: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  // User
  user: {
    name: 'User',
    email: '',
    isAuthenticated: false,
    hasCompletedOnboarding: false,
  },
  setUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),

  signUp: async (name: string, email: string, password: string) => {
    const account: Account = { name, email, password };
    await saveAccount(account);
    await AsyncStorage.setItem(SESSION_KEY, 'true');
    await saveTransactions([]);
    await saveNotifications([]);

    set({
      user: {
        name,
        email,
        isAuthenticated: true,
        hasCompletedOnboarding: true,
      },
      transactions: [],
      notifications: [],
    });
  },

  signIn: async (email: string, password: string) => {
    const account = await loadAccount();

    if (!account || account.email !== email.trim() || account.password !== password) {
      throw new Error('Invalid login credentials');
    }

    await AsyncStorage.setItem(SESSION_KEY, 'true');
    const [transactions, notifications] = await Promise.all([
      loadTransactions(),
      loadNotifications(),
    ]);

    set({
      user: {
        name: account.name,
        email: account.email,
        isAuthenticated: true,
        hasCompletedOnboarding: true,
      },
      transactions,
      notifications,
    });
  },

  updateProfile: async (name: string, email: string) => {
    const account = await loadAccount();
    if (!account) throw new Error('User not authenticated');

    await saveAccount({ ...account, name, email });

    set((state) => ({
      user: { ...state.user, name, email },
    }));
  },

  changePassword: async (newPassword: string) => {
    const account = await loadAccount();
    if (!account) throw new Error('User not authenticated');

    await saveAccount({ ...account, password: newPassword });
  },

  logout: async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    await AsyncStorage.removeItem('hasCompletedOnboarding');
    set({
      user: {
        name: 'User',
        email: '',
        isAuthenticated: false,
        hasCompletedOnboarding: true,
      },
      transactions: [],
      notifications: [],
    });
  },

  // Loading states
  isLoading: false,
  isInitialized: false,

  // Transactions
  transactions: [],
  fetchTransactions: async () => {
    try {
      set({ isLoading: true });
      const transactions = await loadTransactions();
      set({ transactions, isLoading: false });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      set({ transactions: [], isLoading: false });
    }
  },
  addTransaction: async (transaction) => {
    try {
      set({ isLoading: true });

      const newTransaction: Transaction = {
        ...transaction,
        id: generateId(),
      };

      const transactions = [newTransaction, ...get().transactions];
      await saveTransactions(transactions);
      set({ transactions, isLoading: false });

      const newNotification: Notification = {
        id: generateId(),
        type: 'expense',
        title: 'New Expense Added',
        message: `You added a KES ${transaction.amount.toLocaleString()} expense for ${transaction.title}.`,
        timestamp: new Date(),
        read: false,
      };
      const notifications = [newNotification, ...get().notifications];
      await saveNotifications(notifications);
      set({ notifications });
    } catch (error) {
      console.error('Error adding transaction:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  deleteTransaction: async (id) => {
    try {
      const transactions = get().transactions.filter((t) => t.id !== id);
      await saveTransactions(transactions);
      set({ transactions });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  // Notifications
  notifications: [],
  fetchNotifications: async () => {
    try {
      const notifications = await loadNotifications();
      set({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      set({ notifications: [] });
    }
  },
  markAsRead: async (id) => {
    try {
      const notifications = get().notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      await saveNotifications(notifications);
      set({ notifications });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  },
  markAllAsRead: async () => {
    try {
      const notifications = get().notifications.map((n) => ({ ...n, read: true }));
      await saveNotifications(notifications);
      set({ notifications });
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  },
  deleteNotification: async (id) => {
    try {
      const notifications = get().notifications.filter((n) => n.id !== id);
      await saveNotifications(notifications);
      set({ notifications });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },
  clearAllNotifications: async () => {
    try {
      await saveNotifications([]);
      set({ notifications: [] });
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  },

  // UI State
  isAddModalOpen: false,
  setAddModalOpen: (open) => set({ isAddModalOpen: open }),

  // Initialization
  initialize: async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      const hasSession = await AsyncStorage.getItem(SESSION_KEY);
      const account = hasSession === 'true' ? await loadAccount() : null;

      if (account) {
        const [transactions, notifications] = await Promise.all([
          loadTransactions(),
          loadNotifications(),
        ]);

        set({
          user: {
            name: account.name,
            email: account.email,
            isAuthenticated: true,
            hasCompletedOnboarding: hasCompletedOnboarding === 'true',
          },
          transactions,
          notifications,
          isInitialized: true,
        });
      } else {
        set({
          user: {
            name: 'User',
            email: '',
            isAuthenticated: false,
            hasCompletedOnboarding: hasCompletedOnboarding === 'true',
          },
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Initialization error:', error);
      set({
        user: {
          name: 'User',
          email: '',
          isAuthenticated: false,
          hasCompletedOnboarding: false,
        },
        isInitialized: true,
      });
    }
  },
}));
