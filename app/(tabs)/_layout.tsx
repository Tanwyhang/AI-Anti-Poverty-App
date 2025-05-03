import { Tabs } from "expo-router";
import { FileText, Home, MessageCircle } from "lucide-react-native";
import React from 'react';
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          paddingTop: 8,
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -3 },
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
          height: 100,
          paddingBottom: 16,
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
        headerStyle: {
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 1 },
          borderBottomWidth: 0,
          backgroundColor: '#FFFFFFFF',
        },
        headerTitleStyle: {
          fontWeight: '600',
          
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={{ 
              backgroundColor: '#0061C2FF', 
              borderRadius: 25, 
              padding: 20,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 24,
              shadowColor: '#0080FFFF',
              elevation: 2,
              width: 120,
              alignItems: 'center',

            }}>
              <FileText size={32} color={"#FFFFFF"}  />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ask"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
