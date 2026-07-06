import { create } from 'zustand';
import { Transaction, Notification, User } from '../types';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  // User
  user: User;
  setUser: (user: Partial<User>) => void;
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
  setupRealtimeSubscriptions: () => Promise<void>;
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
  updateProfile: async (name: string, email: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Update user metadata in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        email: email,
        data: { name },
      });

      if (authError) throw authError;

      // Try to update profile table if it exists, but don't fail if it doesn't
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: email,
            updated_at: new Date().toISOString(),
          });
      } catch (profileError) {
        // Silently ignore profile table errors as it might not exist
        console.warn('Profile table update failed (table may not exist):', profileError);
      }

      // Update local state
      set((state) => ({
        user: { ...state.user, name, email },
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
  changePassword: async (newPassword: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Update password using Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await supabase.auth.signOut();
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
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Loading states
  isLoading: false,
  isInitialized: false,

  // Transactions
  transactions: [],
  fetchTransactions: async () => {
    try {
      set({ isLoading: true });
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        set({ transactions: [], isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        // Check if it's a "table not found" error
        if (error.code === 'PGRST205') {
          console.warn('Transactions table not found. Please run the database schema.');
          set({ transactions: [], isLoading: false });
          return;
        }
        throw error;
      }

      const transactions: Transaction[] = (data || []).map((t: any) => ({
        id: t.id,
        title: t.title,
        amount: parseFloat(t.amount),
        category: t.category as
          | 'Food & Dining'
          | 'Transportation'
          | 'Bills & Utilities'
          | 'Shopping'
          | 'Health & Fitness'
          | 'Travel'
          | 'Entertainment'
          | 'Personal Care'
          | 'Other',
        date: new Date(t.date),
        receiptUrl: t.receipt_url,
      }));

      set({ transactions, isLoading: false });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      set({ transactions: [], isLoading: false });
    }
  },
  addTransaction: async (transaction) => {
    try {
      set({ isLoading: true });
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          title: transaction.title,
          amount: transaction.amount,
          category: transaction.category,
          date: transaction.date.toISOString(),
          receipt_url: transaction.receiptUrl,
        })
        .select()
        .single();

      if (error) throw error;

      const newTransaction: Transaction = {
        id: data.id,
        title: data.title,
        amount: parseFloat(data.amount),
        category: data.category,
        date: new Date(data.date),
        receiptUrl: data.receipt_url,
      };

      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
        isLoading: false,
      }));

      // Create notification
      await supabase.from('notifications').insert({
        user_id: user.id,
        type: 'expense',
        title: 'New Expense Added',
        message: `You added a KES ${transaction.amount.toLocaleString()} expense for ${transaction.title}.`,
      });

      await get().fetchNotifications();
    } catch (error) {
      console.error('Error adding transaction:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  deleteTransaction: async (id) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  // Notifications
  notifications: [],
  fetchNotifications: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        set({ notifications: [] });
        return;
      }

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Check if it's a "table not found" error
        if (error.code === 'PGRST205') {
          console.warn('Notifications table not found. Please run the database schema.');
          set({ notifications: [] });
          return;
        }
        throw error;
      }

      const notifications: Notification[] = (data || []).map((n: any) => ({
        id: n.id,
        type: n.type as 'expense' | 'budget' | 'report' | 'system',
        title: n.title,
        message: n.message,
        timestamp: new Date(n.created_at),
        read: n.read,
      }));

      set({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      set({ notifications: [] });
    }
  },
  markAsRead: async (id) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  },
  markAllAsRead: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;

      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  },
  deleteNotification: async (id) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },
  clearAllNotifications: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

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
      // Check onboarding status from AsyncStorage
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');

      // Check auth session (suppress network errors during initialization)
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.warn('Could not connect to Supabase. Running in offline mode.');
      }

      if (session?.user) {
        console.log('User session found:', {
          userId: session.user.id,
          email: session.user.email,
          metadata: session.user.user_metadata,
        });

        const userName = session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User';

        set({
          user: {
            name: userName,
            email: session.user.email || '',
            isAuthenticated: true,
            hasCompletedOnboarding: hasCompletedOnboarding === 'true',
          },
          isInitialized: true,
        });

        console.log('User initialized:', userName, session.user.email);

        // Fetch data (errors are handled in each function)
        await get().fetchTransactions();
        await get().fetchNotifications();

        // Setup realtime (errors are handled in the function)
        await get().setupRealtimeSubscriptions();
      } else {
        console.log('No user session found');
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
      // Still mark as initialized so the app doesn't hang
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

  // Real-time subscriptions
  setupRealtimeSubscriptions: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Subscribe to transactions changes
      supabase
        .channel('transactions')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'transactions',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            get().fetchTransactions();
          }
        )
        .subscribe();

      // Subscribe to notifications changes
      supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            get().fetchNotifications();
          }
        )
        .subscribe();
    } catch (error) {
      console.warn('Error setting up realtime subscriptions:', error);
      // Continue without realtime if it fails
    }
  },
}));
