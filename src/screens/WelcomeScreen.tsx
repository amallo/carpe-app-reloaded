import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { colors, typography, spacing, primaryGlow } from '../../constants/theme';
import { useLocalId } from '../../contexts/LocalIdContext';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { localId } = useLocalId();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleCopySaveId = useCallback(() => {
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
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }, [navigation, scaleAnim, localId]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Your local account</Text>
        <View style={styles.idBlock}>
          <Text style={styles.idLabel}>Unique ID</Text>
          <Text style={styles.idValue} selectable>
            {localId}
          </Text>
        </View>
        <Text style={styles.explanation}>
          Your messages remain fully local. Share this ID to connect with others.
        </Text>
        <TouchableOpacity onPress={handleCopySaveId} activeOpacity={1}>
          <Animated.View
            style={[
              styles.primaryButton,
              primaryGlow,
              { transform: [{ scale: scaleAnim }] },
            ]}>
            <Text style={styles.primaryButtonText}>Copy / Save ID</Text>
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
