import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, Bluetooth } from 'lucide-react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { useLocalId } from '@/contexts/LocalIdContext';
import { usePairing } from '@/contexts/PairingContext';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { localId } = useLocalId();
  const { isPaired, pairedDeviceName } = usePairing();
  const [bluetoothOn, setBluetoothOn] = useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.padding }]}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local ID</Text>
        <View style={styles.idBlock}>
          <Text style={styles.idValue} selectable>
            {localId}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Bluetooth</Text>
          <Switch
            value={bluetoothOn}
            onValueChange={setBluetoothOn}
            trackColor={{ false: colors.surface, true: colors.primary }}
            thumbColor={colors.text}
          />
        </View>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => router.push('/(tabs)/pairing')}
          activeOpacity={0.7}>
          <View style={styles.pairingRowLeft}>
            <Bluetooth size={20} color={colors.primary} strokeWidth={2} />
            <Text style={styles.settingLabel}>Appairage Bluetooth</Text>
          </View>
          <View style={styles.pairingRowRight}>
            {isPaired ? (
              <Text style={styles.pairedLabel}>{pairedDeviceName}</Text>
            ) : (
              <Text style={styles.unpairedLabel}>Non appairé</Text>
            )}
            <ChevronRight size={20} color={colors.textDim} strokeWidth={2} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: spacing.padding,
    paddingBottom: spacing.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  headerTitle: {
    ...typography.title,
    fontSize: 20,
    color: colors.text,
  },
  section: {
    paddingHorizontal: spacing.padding,
    paddingTop: spacing.section,
  },
  sectionTitle: {
    ...typography.meta,
    color: colors.textDim,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  idBlock: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.padding,
  },
  idValue: {
    ...typography.headline,
    color: colors.primary,
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: spacing.padding,
    borderRadius: 12,
    marginTop: 12,
  },
  settingLabel: {
    ...typography.headline,
    color: colors.text,
  },
  pairingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pairingRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pairedLabel: {
    ...typography.meta,
    color: colors.primary,
  },
  unpairedLabel: {
    ...typography.meta,
    color: colors.textDim,
  },
});
