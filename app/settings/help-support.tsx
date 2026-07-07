import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  BackArrowIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  FileTextIcon,
  MailIcon,
  MessageCircleIcon,
} from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';

interface FAQ {
  question: string;
  answer: string;
}

export default function HelpSupportScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'How do I add an expense?',
      answer: 'Tap the + button on the home screen, then fill in the expense details including title, amount, and category. You can also scan or upload a receipt.',
    },
    {
      question: 'Can I edit or delete expenses?',
      answer: 'Yes! Swipe left on any expense card and tap the delete icon to remove it. Editing functionality is coming soon.',
    },
    {
      question: 'How are monthly summaries calculated?',
      answer: "Monthly summaries compare your current month's spending with the previous month to show you trends and percentage changes.",
    },
    {
      question: 'What categories are available?',
      answer: 'You can categorize expenses as Payment, Subscriptions, or Refund. Each category has its own color coding for easy identification.',
    },
  ];

  const handleContactEmail = () => {
    Linking.openURL('mailto:support@expenseapp.com');
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.toolbar, { paddingTop: insets.top + 10 }]}>
        <Pressable style={styles.toolbarButton} onPress={() => router.back()}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.toolbarTitle} numberOfLines={1}>
          Help & Support
        </Text>
        <View style={styles.toolbarButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactOptions}>
            <Pressable style={styles.contactOption} onPress={handleContactEmail}>
              <View style={styles.iconContainer}>
                <MailIcon size={20} color={colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactDescription}>support@expenseapp.com</Text>
              </View>
              <ExternalLinkIcon size={18} color={colors.textMuted2} />
            </Pressable>

            <Pressable style={styles.contactOption}>
              <View style={styles.iconContainer}>
                <MessageCircleIcon size={20} color={colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Live Chat</Text>
                <Text style={styles.contactDescription}>Chat with our support team</Text>
              </View>
              <ExternalLinkIcon size={18} color={colors.textMuted2} />
            </Pressable>

            <Pressable style={styles.contactOption}>
              <View style={styles.iconContainer}>
                <FileTextIcon size={20} color={colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Documentation</Text>
                <Text style={styles.contactDescription}>Browse our help articles</Text>
              </View>
              <ExternalLinkIcon size={18} color={colors.textMuted2} />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <Pressable style={styles.faqQuestion} onPress={() => toggleFAQ(index)}>
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <View style={expandedFAQ === index ? styles.faqChevronExpanded : undefined}>
                    <ChevronDownIcon size={20} color={colors.primary} />
                  </View>
                </Pressable>
                {expandedFAQ === index && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.appInfo}>
          <View style={styles.appInfoRow}>
            <Text style={styles.appInfoLabel}>App Version</Text>
            <Text style={styles.appInfoValue}>1.0.0</Text>
          </View>
          <View style={styles.appInfoRow}>
            <Text style={styles.appInfoLabel}>Build Number</Text>
            <Text style={styles.appInfoValue}>2024.11.001</Text>
          </View>
        </View>
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
  contactOptions: {
    gap: 8,
  },
  contactOption: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContent: {
    flex: 1,
    gap: 2,
  },
  contactTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textBlack,
  },
  contactDescription: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  faqList: {
    gap: 8,
  },
  faqItem: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  faqQuestion: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestionText: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textBlack,
  },
  faqChevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted2,
  },
  appInfo: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 8,
  },
  appInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appInfoLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted2,
  },
  appInfoValue: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textBlack,
  },
});
