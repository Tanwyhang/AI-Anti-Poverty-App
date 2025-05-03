import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Send } from 'lucide-react-native';
import { ChatBubble, ChatMessage } from '../../components/ChatBubble';

// Sample chat messages
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Hello! I'm your AI assistant. How can I help you with your financial planning today?",
    isUser: false,
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    text: "I want to know more about the STR program. Am I eligible?",
    isUser: true,
    timestamp: '10:01 AM',
  },
  {
    id: '3',
    text: "Based on your profile information, you are eligible for STR as your monthly income is below RM3,000 and you have 2 dependents. You should apply before the deadline on March 31st.",
    isUser: false,
    timestamp: '10:02 AM',
  },
  {
    id: '4',
    text: "What documents do I need to apply?",
    isUser: true,
    timestamp: '10:03 AM',
  },
  {
    id: '5',
    text: "For STR application, you'll need: 1) MyKad/ID, 2) Income statement/pay slips for the last 3 months, 3) Active bank account details, and 4) Dependent information (if applicable). Make sure all documents are clear and updated.",
    isUser: false,
    timestamp: '10:04 AM',
  },
];

// Sample suggested questions
const suggestedQuestions = [
  "How can I improve my monthly savings?",
  "What other government aid programs am I eligible for?",
  "How do I create an emergency fund?",
  "What skills should I learn for better job opportunities?",
];

export default function AskScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = React.useRef<ScrollView>(null);
  
  const handleSendQuestion = (question: string) => {
    // This would typically involve an API call, but we'll just show a hardcoded response
    
    // First, add the user message
    const userMessage: ChatMessage = {
      id: String(Date.now()),
      text: question,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: String(Date.now() + 1),
        text: "I've received your question. As this is a prototype, I'm showing a pre-defined response. In the full version, I would provide personalized advice based on your specific situation and financial needs.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Scroll to bottom after adding new message
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 1000);
    
    // Scroll immediately when user sends message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </ScrollView>
      
      <View style={styles.suggestedContainer}>
        <Text style={styles.suggestedTitle}>Suggested Questions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestedScroll}>
          {suggestedQuestions.map((question, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.suggestedQuestion}
              onPress={() => handleSendQuestion(question)}
            >
              <Text style={styles.suggestedText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your question..."
          placeholderTextColor="#8E8E93"
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.disabledButton]}
          disabled={!inputText.trim()}
          onPress={() => handleSendQuestion(inputText)}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  suggestedContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C7C7CC',
    backgroundColor: '#FFFFFF',
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  suggestedScroll: {
    flexDirection: 'row',
  },
  suggestedQuestion: {
    backgroundColor: '#E9E9EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  suggestedText: {
    fontSize: 14,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C7C7CC',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 8,
    paddingRight: 40,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#C7C7CC',
  },
});
