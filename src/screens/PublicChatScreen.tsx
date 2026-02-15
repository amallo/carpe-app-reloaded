import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bluetooth, Send } from 'lucide-react-native';
import { colors, typography, fontFamily, spacing } from '../../constants/theme';
import {
  publicChatMessages,
  type PublicMessage,
  type Presence,
} from '../../data/publicChatData';
import { usePairing } from '../../contexts/PairingContext';

const presenceLabel: Record<Presence, string> = {
  proche: 'Proche',
  loin: 'Loin',
  tres_eloigne: 'Très éloigné',
};

const presenceDotColor: Record<Presence, string> = {
  proche: colors.primary,
  loin: '#E8B923',
  tres_eloigne: colors.textDim,
};

function MessageBubble({ msg }: { msg: PublicMessage }) {
  const isOwn = msg.isOwn;
  return (
    <View style={[styles.bubbleWrap, isOwn && styles.bubbleWrapOwn]}>
      <View style={[styles.bubble, isOwn && styles.bubbleOwn]}>
        <Text style={styles.bubbleAuthor}>{msg.senderName}</Text>
        <Text style={styles.bubbleText}>{msg.text}</Text>
        <View style={styles.bubbleFooter}>
          <View style={styles.bubblePresence}>
            <View
              style={[
                styles.bubblePresenceDot,
                { backgroundColor: presenceDotColor[msg.presence] },
              ]}
            />
            <Text style={styles.bubblePresenceLabel}>
              {presenceLabel[msg.presence]}
            </Text>
          </View>
          <Text style={styles.bubbleTime}>{msg.timestamp}</Text>
        </View>
      </View>
    </View>
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function PublicChatScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { isPaired, pairedDeviceName } = usePairing();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<PublicMessage[]>(() => [...publicChatMessages]);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: PublicMessage = {
      id: `m-${Date.now()}`,
      senderId: 'user-1',
      senderName: 'You',
      text,
      timestamp: formatTime(new Date()),
      isOwn: true,
      status: 'sent',
      presence: 'proche',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.padding }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Tout le monde</Text>
        </View>
        <TouchableOpacity
          style={styles.headerStatus}
          onPress={() => navigation.navigate('Pairing' as never)}
          activeOpacity={0.8}>
          {isPaired ? (
            <>
              <View style={styles.statusDot} />
              <Text style={styles.headerStatusText} numberOfLines={1}>
                {pairedDeviceName ?? 'Appareil'}
              </Text>
            </>
          ) : (
            <>
              <Bluetooth size={18} color={colors.primary} strokeWidth={2} />
              <Text style={styles.headerStatusLabel}>Appairer</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </ScrollView>

      <View style={[styles.inputRow, { paddingBottom: spacing.padding }]}>
        <TextInput
          style={styles.input}
          placeholder="Message…"
          placeholderTextColor={colors.textDim}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={[styles.sendButton, input.trim() ? styles.sendButtonActive : null]}
          activeOpacity={0.8}
          disabled={!input.trim()}>
          <Send size={22} color={input.trim() ? colors.background : colors.textDim} strokeWidth={2} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingHorizontal: spacing.padding,
    paddingBottom: spacing.padding,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    gap: 12,
  },
  headerLeft: { flex: 1, minWidth: 0 },
  headerTitle: {
    ...typography.title,
    fontSize: 20,
    color: colors.text,
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderLeftWidth: 1,
    borderLeftColor: colors.primary,
    gap: 6,
    maxWidth: '50%',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  headerStatusText: {
    ...typography.meta,
    fontSize: 12,
    color: colors.textDim,
    maxWidth: 100,
  },
  headerStatusLabel: {
    ...typography.metaMedium,
    fontSize: 12,
    color: colors.primary,
  },
  list: { flex: 1 },
  listContent: {
    padding: spacing.padding,
    paddingBottom: spacing.section,
  },
  bubbleWrap: {
    alignSelf: 'flex-start',
    maxWidth: '82%',
    marginBottom: 6,
  },
  bubbleWrapOwn: { alignSelf: 'flex-end' },
  bubble: {
    backgroundColor: '#2A2D35',
    borderRadius: 18,
    borderTopLeftRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  bubbleOwn: {
    backgroundColor: '#1B3B2E',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 4,
  },
  bubbleAuthor: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: '#B8A898',
    marginBottom: 2,
  },
  bubbleText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 22,
  },
  bubbleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 8,
  },
  bubblePresence: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  bubblePresenceDot: { width: 5, height: 5, borderRadius: 2.5 },
  bubblePresenceLabel: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.textDim,
  },
  bubbleTime: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.textDim,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.padding,
    paddingVertical: spacing.padding,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    gap: 12,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
});
