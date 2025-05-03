import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <View style={[
      styles.container,
      message.isUser ? styles.userContainer : styles.aiContainer
    ]}>
      <Text style={[
        styles.messageText,
        message.isUser ? styles.userText : styles.aiText
      ]}>
        {message.text}
      </Text>
      <Text style={styles.timestamp}>{message.timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F7',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
    opacity: 0.7,
    color: '#F2F2F7',
  },
});
