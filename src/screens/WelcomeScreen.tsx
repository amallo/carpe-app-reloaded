import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriangleAlert } from 'lucide-react-native';
import { colors, typography, spacing, primaryGlow } from '../../constants/theme';
import { useLocalId } from '../../contexts/LocalIdContext';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { localId } = useLocalId();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleContinue = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    navigation.navigate('OnboardingPseudo' as never);
  }, [navigation, scaleAnim]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Votre identité locale</Text>
        <View style={styles.warningRow}>
          <TriangleAlert size={18} color={colors.alert} strokeWidth={2} />
          <Text style={styles.warningText}>Valable uniquement sur ce téléphone</Text>
        </View>
        <Text style={styles.explanation}>
          Un identifiant a été généré. Il sert à vous identifier de manière unique auprès de vos destinataires.
        </Text>
        <View style={styles.idBlock}>
          <Text style={styles.idLabel}>Identifiant</Text>
          <Text style={styles.idValue} selectable>
            {localId}
          </Text>
        </View>
        <TouchableOpacity onPress={handleContinue} activeOpacity={1}>
          <Animated.View
            style={[styles.primaryButton, primaryGlow, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.primaryButtonText}>Continuer</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.padding * 2,
  },
  title: {
    ...typography.title,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.section,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    marginBottom: spacing.padding,
  },
  warningText: {
    ...typography.metaMedium,
    color: colors.alert,
    flex: 1,
  },
  idBlock: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.padding,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.section,
  },
  idLabel: {
    ...typography.meta,
    color: colors.textDim,
    marginBottom: 8,
  },
  idValue: {
    ...typography.headline,
    fontSize: 17,
    color: colors.primary,
    letterSpacing: 1,
  },
  explanation: {
    ...typography.meta,
    fontSize: 13,
    color: colors.textDim,
    textAlign: 'center',
    marginBottom: spacing.section,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
});
