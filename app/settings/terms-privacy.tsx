import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BackArrowIcon, ExternalLinkIcon } from '../../components/icons';
import { colors, fonts, radii } from '../../constants/theme';

export default function TermsPrivacyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={[styles.toolbar, { paddingTop: insets.top + 10 }]}>
        <Pressable style={styles.toolbarButton} onPress={() => router.back()}>
          <BackArrowIcon />
        </Pressable>
        <Text style={styles.toolbarTitle} numberOfLines={1}>
          Terms & Privacy
        </Text>
        <View style={styles.toolbarButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Documents</Text>
          <View style={styles.documentList}>
            <Pressable style={styles.documentItem}>
              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Terms of Service</Text>
                <Text style={styles.documentDate}>Last updated: November 2024</Text>
              </View>
              <ExternalLinkIcon size={18} color={colors.textMuted2} />
            </Pressable>

            <Pressable style={styles.documentItem}>
              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Privacy Policy</Text>
                <Text style={styles.documentDate}>Last updated: November 2024</Text>
              </View>
              <ExternalLinkIcon size={18} color={colors.textMuted2} />
            </Pressable>

            <Pressable style={styles.documentItem}>
              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Cookie Policy</Text>
                <Text style={styles.documentDate}>Last updated: November 2024</Text>
              </View>
              <ExternalLinkIcon size={18} color={colors.textMuted2} />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Privacy</Text>
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
                service providers necessary to operate the app, and only to the extent required.
              </Text>
            </View>

            <View style={styles.privacyItem}>
              <Text style={styles.privacyTitle}>Your Rights</Text>
              <Text style={styles.privacyText}>
                You have the right to access, modify, or delete your personal data at any time.
                Contact our support team for assistance with data requests.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compliance</Text>
          <View style={styles.complianceCard}>
            <Text style={styles.complianceIntro}>Our app complies with:</Text>
            <View style={styles.complianceList}>
              <View style={styles.complianceItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.complianceText}>General Data Protection Regulation (GDPR)</Text>
              </View>
              <View style={styles.complianceItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.complianceText}>California Consumer Privacy Act (CCPA)</Text>
              </View>
              <View style={styles.complianceItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.complianceText}>Payment Card Industry Data Security Standard (PCI DSS)</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Questions about our policies?</Text>
          <Text style={styles.contactText}>Contact us at privacy@expenseapp.com</Text>
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
  documentList: {
    gap: 8,
  },
  documentItem: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentContent: {
    flex: 1,
    gap: 2,
  },
  documentTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textBlack,
  },
  documentDate: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
  privacyCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 16,
  },
  privacyItem: {
    gap: 6,
  },
  privacyTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textBlack,
  },
  privacyText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted2,
  },
  complianceCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    gap: 12,
  },
  complianceIntro: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted2,
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
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.primary,
  },
  complianceText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textBlack,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    gap: 4,
  },
  contactTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textBlack,
  },
  contactText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted2,
  },
});
