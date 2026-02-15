import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Bluetooth } from 'lucide-react-native';
import { colors, typography, spacing } from '../../constants/theme';
import { usePairing } from '../../contexts/PairingContext';

const MOCK_DEVICES = [
  { id: 'd1', name: 'Device A' },
  { id: 'd2', name: 'Device B' },
  { id: 'd3', name: 'Device C' },
];

export default function PairingScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { setPaired } = usePairing();

  const handlePair = (deviceName: string) => {
    setPaired(true, deviceName);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.padding }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <ChevronLeft size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appairage Bluetooth</Text>
        <Text style={styles.headerMeta}>
          Sélectionnez un appareil pour l'appairer
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {MOCK_DEVICES.map((device) => (
          <TouchableOpacity
            key={device.id}
            style={styles.deviceRow}
            onPress={() => handlePair(device.name)}
            activeOpacity={0.7}>
            <View style={styles.deviceIcon}>
              <Bluetooth size={22} color={colors.primary} strokeWidth={2} />
            </View>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceAction}>Appairer</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.padding,
    paddingBottom: spacing.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  backButton: {
    marginBottom: 8,
  },
  headerTitle: {
    ...typography.title,
    fontSize: 20,
    color: colors.text,
  },
  headerMeta: {
    ...typography.meta,
    color: colors.textDim,
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: spacing.padding,
    paddingTop: spacing.section,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: spacing.padding,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  deviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceName: {
    ...typography.headline,
    flex: 1,
    color: colors.text,
  },
  deviceAction: {
    ...typography.metaMedium,
    color: colors.primary,
  },
});
