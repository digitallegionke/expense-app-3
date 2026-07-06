import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  FileText,
  ExternalLink,
  ChevronDown,
} from 'lucide-react-native';

interface FAQ {
  question: string;
  answer: string;
}

export default function HelpSupportScreen() {
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
            <Text style={styles.title}>Help & Support</Text>
            <Text style={styles.subtitle}>Get help and contact our team</Text>
          </View>
        </View>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT US</Text>
          <View style={styles.contactOptions}>
            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleContactEmail}
            >
              <View style={styles.iconContainer}>
                <Mail size={20} color="#69508C" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactDescription}>
                  support@expenseapp.com
                </Text>
              </View>
              <ExternalLink size={18} color="#B3B3B3" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption}>
              <View style={styles.iconContainer}>
                <MessageCircle size={20} color="#69508C" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Live Chat</Text>
                <Text style={styles.contactDescription}>
                  Chat with our support team
                </Text>
              </View>
              <ExternalLink size={18} color="#B3B3B3" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption}>
              <View style={styles.iconContainer}>
                <FileText size={20} color="#69508C" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Documentation</Text>
                <Text style={styles.contactDescription}>
                  Browse our help articles
                </Text>
              </View>
              <ExternalLink size={18} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>
          <View style={styles.faqList}>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(index)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <ChevronDown
                    size={20}
                    color="#69508C"
                    style={[
                      styles.faqChevron,
                      expandedFAQ === index && styles.faqChevronExpanded,
                    ]}
                  />
                </TouchableOpacity>
                {expandedFAQ === index && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* App Info */}
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
  contactOptions: {
    gap: 8,
  },
  contactOption: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(103, 92, 168, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3C40',
  },
  contactDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: '#828282',
    marginTop: 2,
  },
  faqList: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
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
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3C40',
  },
  faqChevron: {
    transform: [{ rotate: '0deg' }],
  },
  faqChevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 14,
    color: '#828282',
    lineHeight: 22,
  },
  appInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  appInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appInfoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#828282',
  },
  appInfoValue: {
    fontSize: 14,
    color: '#3D3C40',
  },
});
