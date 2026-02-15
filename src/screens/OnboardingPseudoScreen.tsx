import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { ChevronLeft, TriangleAlert } from 'lucide-react-native';
import { colors, typography, fontFamily, spacing, primaryGlow } from '../../constants/theme';
import { useLocalId } from '../../contexts/LocalIdContext';

export default function OnboardingPseudoScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { localId, pseudo, setPseudo } = useLocalId();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCopyAndContinue = useCallback(() => {
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
    Clipboard.setString(localId);
    navigation.reset({ index: 0, routes: [{ name: 'Main' as never }] });
  }, [navigation, scaleAnim, localId]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + spacing.padding }]}
        onPress={handleBack}
        activeOpacity={0.8}>
        <ChevronLeft size={24} color={colors.text} strokeWidth={2} />
        <Text style={styles.backLabel}>Retour</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Votre pseudo</Text>
        <Text style={styles.explanation}>
          Il sert à faciliter la reconnaissance de vos messages, vous pouvez le modifier à tout moment.
        </Text>
        
        <View style={styles.warningRow}>
          <TriangleAlert size={18} color={colors.alert} strokeWidth={2} />
          <Text style={styles.warningText}>Seul votre identifiant est unique.</Text>
        </View>
        <Text style={styles.pseudoLabel}>Pseudo (optionnel)</Text>
        <TextInput
          style={styles.pseudoInput}
          placeholder="Votre pseudo"
          placeholderTextColor={colors.textDim}
          value={pseudo}
          onChangeText={setPseudo}
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handleCopyAndContinue} activeOpacity={1}>
          <Animated.View
            style={[styles.primaryButton, primaryGlow, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.primaryButtonText}>Créer mon profil
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    position: 'absolute',
    left: spacing.padding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 1,
  },
  backLabel: {
    ...typography.metaMedium,
    color: colors.text,
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
  explanation: {
    ...typography.meta,
    fontSize: 13,
    color: colors.textDim,
    textAlign: 'center',
    marginBottom: spacing.section,
    lineHeight: 18,
  },
  pseudoLabel: {
    ...typography.meta,
    color: colors.textDim,
    marginBottom: 8,
    alignSelf: 'stretch',
  },
  pseudoInput: {
    ...typography.headline,
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: spacing.section,
    width: '100%',
    letterSpacing: 2,
    textAlign: 'center',
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
