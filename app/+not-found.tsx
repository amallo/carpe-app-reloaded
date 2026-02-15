import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/(tabs)" style={styles.link}>
          <Text style={styles.linkText}>Go to Chats</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.padding,
    backgroundColor: colors.background,
  },
  text: {
    ...typography.headline,
    color: colors.textDim,
  },
  link: {
    marginTop: spacing.section,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  linkText: {
    ...typography.headline,
    color: colors.primary,
  },
});
