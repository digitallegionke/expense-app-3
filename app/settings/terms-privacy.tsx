import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, ExternalLink } from 'lucide-react-native';

export default function TermsPrivacyScreen() {
  const router = useRouter();

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
            <Text style={styles.title}>Terms & Privacy</Text>
            <Text style={styles.subtitle}>Legal information and policies</Text>
          </View>
        </View>

        {/* Legal Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL DOCUMENTS</Text>
          <View style={styles.documentList}>
            <TouchableOpacity style={styles.documentItem}>
              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Terms of Service</Text>
                <Text style={styles.documentDate}>Last updated: November 2024</Text>
              </View>
              <ExternalLink size={18} color="#B3B3B3" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.documentItem}>
              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Privacy Policy</Text>
                <Text style={styles.documentDate}>Last updated: November 2024</Text>
              </View>
              <ExternalLink size={18} color="#B3B3B3" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.documentItem}>
              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Cookie Policy</Text>
                <Text style={styles.documentDate}>Last updated: November 2024</Text>
              </View>
              <ExternalLink size={18} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR PRIVACY</Text>
          <View style={styles.privacyCard}>
            <View style={styles.privacyItem}>
              <Text style={styles.privacyTitle}>Data Collection</Text>
              <Text style={styles.privacyText}>
                We collect only the information necessary to provide our expense tracking
                services. This includes your account information, expense data, and receipt
                images you choose to upload.
              </Text>
            </View>

            <View style={styles.privacyItem}>
              <Text style={styles.privacyTitle}>Data Security</Text>
              <Text style={styles.privacyText}>
                Your data is encrypted both in transit and at rest. We use industry-standard
                security measures to protect your financial information.
              </Text>
            </View>

            <View style={styles.privacyItem}>
              <Text style={styles.privacyTitle}>Data Sharing</Text>
              <Text style={styles.privacyText}>
                We never sell your personal data. We only share information with third-party
                service providers necessary to operate the app, and only to the extent
                required.
              </Text>
            </View>

            <View style={styles.privacyItem}>
              <Text style={styles.privacyTitle}>Your Rights</Text>
              <Text style={styles.privacyText}>
                You have the right to access, modify, or delete your personal data at any
                time. Contact our support team for assistance with data requests.
              </Text>
            </View>
          </View>
        </View>

        {/* Compliance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COMPLIANCE</Text>
          <View style={styles.complianceCard}>
            <Text style={styles.complianceIntro}>Our app complies with:</Text>
            <View style={styles.complianceList}>
              <View style={styles.complianceItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.complianceText}>
                  General Data Protection Regulation (GDPR)
                </Text>
              </View>
              <View style={styles.complianceItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.complianceText}>
                  California Consumer Privacy Act (CCPA)
                </Text>
              </View>
              <View style={styles.complianceItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.complianceText}>
                  Payment Card Industry Data Security Standard (PCI DSS)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Questions about our policies?</Text>
          <Text style={styles.contactText}>
            Contact us at privacy@expenseapp.com
          </Text>
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
  documentList: {
    gap: 8,
  },
  documentItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3C40',
  },
  documentDate: {
    fontSize: 13,
    fontWeight: '500',
    color: '#828282',
    marginTop: 2,
  },
  privacyCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
  privacyItem: {
    gap: 8,
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D3C40',
  },
  privacyText: {
    fontSize: 14,
    color: '#828282',
    lineHeight: 22,
  },
  complianceCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  complianceIntro: {
    fontSize: 14,
    color: '#828282',
    lineHeight: 22,
    marginBottom: 12,
  },
  complianceList: {
    gap: 8,
  },
  complianceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#69508C',
    marginTop: 2,
  },
  complianceText: {
    flex: 1,
    fontSize: 14,
    color: '#3D3C40',
  },
  contactCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#69508C',
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D3C40',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 13,
    color: '#828282',
  },
});
