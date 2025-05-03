import { Award, DollarSign, FileText, HelpCircle, MessageCircle, Send, TrendingUp } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ChatBubble, ChatMessage } from '../../components/ChatBubble';

// Theme colors for consistency with other screens
const theme = {
  primary: "#0284C7", // Blue
  secondary: "#20D4BCFF", // Light blue/teal
  background: "#F0F9FF",
  text: "#0C4A6E",
  textLight: "#64748B",
  cardBackground: "#FFFFFDFF",
  red: "#EF6644FF", // Red
};

// Sample chat messages with enhanced content
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Hello! I'm your AI assistant. How can I help you with your financial planning today?",
    isUser: false,
    timestamp: '10:00 AM',
    icon: 'message-circle',
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
    icon: 'award',
    visualData: {
      type: 'eligibility',
      eligible: true,
      criteria: [
        { name: 'Income', value: 'RM2,850', threshold: 'Below RM3,000', met: true },
        { name: 'Dependents', value: '2', threshold: 'Any', met: true },
        { name: 'Location', value: 'Selangor', threshold: 'Malaysia', met: true },
      ],
      deadline: 'March 31, 2024'
    }
  },
];

// Enhanced suggested questions with categories
const suggestedQuestions = [
  { 
    text: "How can I improve my monthly savings?", 
    icon: 'trending-up',
    category: 'savings'
  },
  { 
    text: "What other government aid programs am I eligible for?", 
    icon: 'award',
    category: 'aid'
  },
  { 
    text: "How do I create an emergency fund?", 
    icon: 'dollar-sign',
    category: 'planning'
  },
  { 
    text: "What skills should I learn for better job opportunities?", 
    icon: 'file-text',
    category: 'career'
  },
];

export default function AskScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  }, [messages]);
  
  const handleSendQuestion = (question: string) => {
    // First, add the user message
    const userMessage: ChatMessage = {
      id: String(Date.now()),
      text: question,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Create different types of responses based on keywords
      let aiResponse: ChatMessage;
      
      if (question.toLowerCase().includes('saving') || question.toLowerCase().includes('budget')) {
        aiResponse = {
          id: String(Date.now() + 1),
          text: "Based on your income and expenses, I recommend saving at least RM285 (10% of your income) monthly. Try reducing your 'Others' category spending by RM30 to reach this goal.",
          isUser: false,
          icon: 'trending-up',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          visualData: {
            type: 'savingsPlan',
            currentSavings: 50,
            targetSavings: 285,
            suggestions: [
              { category: 'Food', current: 950, suggested: 900, saving: 50 },
              { category: 'Others', current: 300, suggested: 270, saving: 30 },
            ]
          }
        };
      } else if (question.toLowerCase().includes('aid') || question.toLowerCase().includes('program') || question.toLowerCase().includes('eligible')) {
        aiResponse = {
          id: String(Date.now() + 1),
          text: "Based on your profile, you're eligible for these aid programs:",
          isUser: false,
          icon: 'award',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          visualData: {
            type: 'aidPrograms',
            programs: [
              { name: 'Sumbangan Tunai Rahmah (STR)', amount: 'RM2,000 yearly', deadline: 'March 31' },
              { name: 'PeKa B40', amount: 'Free healthcare', deadline: 'Ongoing' },
              { name: 'Program Perumahan Rakyat', amount: '30% housing subsidy', deadline: 'December' },
            ]
          }
        };
      } else {
        aiResponse = {
          id: String(Date.now() + 1),
          text: "I'm analyzing your financial profile to provide personalized advice. Based on your situation, you should focus on reducing housing costs and building emergency savings of at least RM8,500 (3 months of expenses).",
          isUser: false,
          icon: 'bar-chart-2',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  // Render the typing indicator
  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <View style={styles.typingContainer}>
        <MessageCircle size={16} color={theme.primary} style={{marginRight: 8}} />
        <Text style={styles.typingText}>AI Assistant is typing...</Text>
        <View style={styles.typingDots}>
          <View style={[styles.typingDot, {animationDelay: '0s'}]} />
          <View style={[styles.typingDot, {animationDelay: '0.3s'}]} />
          <View style={[styles.typingDot, {animationDelay: '0.6s'}]} />
        </View>
      </View>
    );
  };

  // Function to render the AI avatar
  const renderAiAvatar = () => (
    <View style={styles.aiAvatarContainer}>
      <Image 
        source={require('../../assets/images/ai-avatar.png')} 
        style={styles.aiAvatar}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerBar}>
        <MessageCircle size={22} color={theme.primary} />
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <HelpCircle size={22} color={theme.textLight} />
      </View>
      
      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={true}
      >
        {messages.map(message => (
          <ChatBubble 
            key={message.id} 
            message={message} 
            theme={theme} 
          />
        ))}
        
        {renderTypingIndicator()}
        
        <View style={{ height: 20 }} />
      </ScrollView>
      
      <View style={styles.suggestedContainer}>
        <Text style={[styles.suggestedTitle, {color: theme.textLight}]}>
          Suggested Questions
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestedScroll}>
          {suggestedQuestions.map((question, index) => {
            // Get the appropriate icon component
            let IconComponent;
            switch(question.icon) {
              case 'trending-up':
                IconComponent = TrendingUp;
                break;
              case 'award':
                IconComponent = Award;
                break;
              case 'dollar-sign':
                IconComponent = DollarSign;
                break;
              case 'file-text':
                IconComponent = FileText;
                break;
              default:
                IconComponent = HelpCircle;
            }
            
            return (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.suggestedQuestion, 
                  {backgroundColor: theme.cardBackground, borderColor: theme.secondary}
                ]}
                onPress={() => handleSendQuestion(question.text)}
              >
                <IconComponent size={16} color={theme.secondary} style={styles.questionIcon} />
                <Text style={[styles.suggestedText, {color: theme.text}]}>{question.text}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, {backgroundColor: theme.background}]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your question..."
          placeholderTextColor={theme.textLight}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            {backgroundColor: inputText.trim() ? theme.primary : theme.textLight}
          ]}
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
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 32,
    backgroundColor: theme.cardBackground,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
    height: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 8,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  typingText: {
    fontSize: 14,
    color: theme.textLight,
    fontStyle: 'italic',
  },
  typingDots: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  typingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.primary,
    margin: 2,
    opacity: 0.6,
  },
  aiAvatarContainer: {
    width: 36, 
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  suggestedContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C7C7CC',
    backgroundColor: theme.cardBackground,
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestedScroll: {
    flexDirection: 'row',
  },
  suggestedQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  questionIcon: {
    marginRight: 6,
  },
  suggestedText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 80,
    backgroundColor: theme.cardBackground,
    alignItems: 'flex-start',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C7C7CC',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 8,
    paddingRight: 40,
    fontSize: 16,
    maxHeight: 100,
    color: theme.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
