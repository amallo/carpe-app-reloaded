import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle, Settings, Globe2 } from 'lucide-react-native';
import { LocalIdProvider } from './contexts/LocalIdContext';
import { PairingProvider } from './contexts/PairingContext';
import { colors } from './constants/theme';
import WelcomeScreen from './src/screens/WelcomeScreen';
import PublicChatScreen from './src/screens/PublicChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PairingScreen from './src/screens/PairingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_BAR_HEIGHT = 56;

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.background,
          borderTopWidth: 1,
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
      }}>
      <Tab.Screen
        name="Chat"
        component={PublicChatScreen}
        options={{
          title: 'Entourage',
          tabBarIcon: ({ size, color }) => (
            <Globe2 size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LocalIdProvider>
        <PairingProvider>
          <StatusBar barStyle="light-content" backgroundColor={colors.background} />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
              }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="Pairing" component={PairingScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PairingProvider>
      </LocalIdProvider>
    </SafeAreaProvider>
  );
}
