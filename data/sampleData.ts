export interface Contact {
  id: string;
  name: string;
  uniqueId: string;
  publicKey?: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface BroadcastMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export const currentUser = {
  id: 'user-1',
  name: 'You',
  uniqueId: 'TW-4F8A-9B2C',
};

export const contacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Alice Johnson',
    uniqueId: 'TW-7C3D-1E4F',
    status: 'online',
  },
  {
    id: 'contact-2',
    name: 'Bob Smith',
    uniqueId: 'TW-9A1B-2C5D',
    status: 'online',
  },
  {
    id: 'contact-3',
    name: 'Charlie Davis',
    uniqueId: 'TW-5E6F-3D7A',
    status: 'offline',
    lastSeen: '5m ago',
  },
  {
    id: 'contact-4',
    name: 'Diana Wilson',
    uniqueId: 'TW-8B9C-4E1F',
    status: 'online',
  },
  {
    id: 'contact-5',
    name: 'Eve Martinez',
    uniqueId: 'TW-2D3E-5F6A',
    status: 'offline',
    lastSeen: '1h ago',
  },
];

export const chatMessages: { [contactId: string]: Message[] } = {
  'contact-1': [
    {
      id: 'msg-1',
      senderId: 'contact-1',
      senderName: 'Alice Johnson',
      text: 'Hey! Are you nearby?',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      senderName: 'You',
      text: 'Yes! Just around the corner.',
      timestamp: '10:31 AM',
      isOwn: true,
    },
    {
      id: 'msg-3',
      senderId: 'contact-1',
      senderName: 'Alice Johnson',
      text: 'Great! See you in a minute.',
      timestamp: '10:32 AM',
      isOwn: false,
    },
  ],
  'contact-2': [
    {
      id: 'msg-4',
      senderId: 'contact-2',
      senderName: 'Bob Smith',
      text: 'Testing the connection',
      timestamp: '9:15 AM',
      isOwn: false,
    },
    {
      id: 'msg-5',
      senderId: 'user-1',
      senderName: 'You',
      text: 'Connection looks good!',
      timestamp: '9:16 AM',
      isOwn: true,
    },
  ],
  'contact-4': [
    {
      id: 'msg-6',
      senderId: 'user-1',
      senderName: 'You',
      text: 'Hi Diana!',
      timestamp: '2:45 PM',
      isOwn: true,
    },
    {
      id: 'msg-7',
      senderId: 'contact-4',
      senderName: 'Diana Wilson',
      text: 'Hello! How are you?',
      timestamp: '2:46 PM',
      isOwn: false,
    },
  ],
};

export const broadcastMessages: BroadcastMessage[] = [
  {
    id: 'bc-1',
    senderId: 'contact-1',
    senderName: 'Alice Johnson',
    text: 'Anyone at the park right now?',
    timestamp: '11:20 AM',
  },
  {
    id: 'bc-2',
    senderId: 'contact-2',
    senderName: 'Bob Smith',
    text: 'Heading to the coffee shop if anyone wants to join',
    timestamp: '11:45 AM',
  },
  {
    id: 'bc-3',
    senderId: 'user-1',
    senderName: 'You',
    text: 'Network test - everyone receiving?',
    timestamp: '12:05 PM',
  },
  {
    id: 'bc-4',
    senderId: 'contact-4',
    senderName: 'Diana Wilson',
    text: 'Lost my keys near the library, anyone seen them?',
    timestamp: '12:30 PM',
  },
  {
    id: 'bc-5',
    senderId: 'contact-3',
    senderName: 'Charlie Davis',
    text: 'Great weather today!',
    timestamp: '1:15 PM',
  },
];
