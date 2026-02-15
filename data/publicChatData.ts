/** P2P delivery status for public chat */
export type MessageStatus = 'sent' | 'received_direct' | 'relayed';

/** Indicateur de présence : distance de l'auteur */
export type Presence = 'proche' | 'loin' | 'tres_eloigne';

export interface PublicMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status: MessageStatus;
  presence: Presence;
}

export const publicChatMessages: PublicMessage[] = [
  {
    id: 'm1',
    senderId: 'user-1',
    senderName: 'You',
    text: 'Anyone around?',
    timestamp: '10:30',
    isOwn: true,
    status: 'received_direct',
    presence: 'proche',
  },
  {
    id: 'm2',
    senderId: 'd1',
    senderName: 'Device A',
    text: 'Yes, here.',
    timestamp: '10:31',
    isOwn: false,
    status: 'received_direct',
    presence: 'proche',
  },
  {
    id: 'm3',
    senderId: 'user-1',
    senderName: 'You',
    text: 'Testing the link.',
    timestamp: '10:32',
    isOwn: true,
    status: 'sent',
    presence: 'loin',
  },
  {
    id: 'm4',
    senderId: 'd2',
    senderName: 'Device B',
    text: 'Got it via relay.',
    timestamp: '10:33',
    isOwn: false,
    status: 'relayed',
    presence: 'tres_eloigne',
  },
  {
    id: 'm5',
    senderId: 'user-1',
    senderName: 'You',
    text: 'Good.',
    timestamp: '10:34',
    isOwn: true,
    status: 'received_direct',
    presence: 'proche',
  },
];

export const nearbyDevicesDummy = [
  { id: 'd1', name: 'Device A', status: 'online' as const },
  { id: 'd2', name: 'Device B', status: 'online' as const },
  { id: 'd3', name: 'Device C', status: 'offline' as const },
];
