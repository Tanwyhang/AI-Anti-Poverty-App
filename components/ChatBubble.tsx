import { Award, BarChart2, FileText, MessageCircle, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  icon?: string;
  visualData?: any;
}

interface ChatBubbleProps {
  message: ChatMessage;
  theme?: any;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message,
  theme = {
    primary: "#0284C7",
    secondary: "#20D4BCFF",
    background: "#F0F9FF",
    text: "#0C4A6E",
    textLight: "#64748B",
  }
}) => {
  const renderIcon = () => {
    if (!message.icon || message.isUser) return null;
    
    let IconComponent;
    switch(message.icon) {
      case 'award':
        IconComponent = Award;
        break;
      case 'file-text':
        IconComponent = FileText;
        break;
      case 'trending-up':
        IconComponent = TrendingUp;
        break;
      case 'bar-chart-2':
        IconComponent = BarChart2;
        break;
      default:
        IconComponent = MessageCircle;
    }
    
    return (
      <View style={styles.iconContainer}>
        <IconComponent size={18} color={theme.primary} />
      </View>
    );
  };

  const renderVisualData = () => {
    if (!message.visualData || message.isUser) return null;
    
    switch(message.visualData.type) {
      case 'eligibility':
        return (
          <View style={styles.visualContainer}>
            <View style={styles.eligibilityHeader}>
              <Award size={16} color={theme.secondary} />
              <Text style={[styles.visualTitle, {color: theme.text}]}>
                STR Eligibility Check
              </Text>
              <View style={[
                styles.eligibilityStatus, 
                {backgroundColor: message.visualData.eligible ? '#34C759' : '#FF3B30'}
              ]}>
                <Text style={styles.eligibilityStatusText}>
                  {message.visualData.eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                </Text>
              </View>
            </View>
            
            {message.visualData.criteria.map((criterion: any, index: number) => (
              <View key={index} style={styles.criterionRow}>
                <Text style={styles.criterionLabel}>{criterion.name}:</Text>
                <Text style={styles.criterionValue}>{criterion.value}</Text>
                <View style={[
                  styles.criterionStatus, 
                  {backgroundColor: criterion.met ? '#34C759' : '#FF3B30'}
                ]}>
                  <Text style={styles.criterionStatusText}>
                    {criterion.met ? '✓' : '✗'}
                  </Text>
                </View>
              </View>
            ))}
            
            <View style={styles.deadlineContainer}>
              <Text style={[styles.deadlineText, {color: theme.textLight}]}>
                Apply before: {message.visualData.deadline}
              </Text>
            </View>
          </View>
        );
      
      case 'documentList':
        return (
          <View style={styles.visualContainer}>
            <View style={styles.documentsHeader}>
              <FileText size={16} color={theme.secondary} />
              <Text style={[styles.visualTitle, {color: theme.text}]}>
                Required Documents
              </Text>
            </View>
            
            {message.visualData.documents.map((doc: any, index: number) => (
              <View key={index} style={styles.documentRow}>
                <View style={[styles.documentBullet, {backgroundColor: theme.secondary}]} />
                <View style={styles.documentInfo}>
                  <Text style={[styles.documentName, {color: theme.text}]}>
                    {doc.name}
                  </Text>
                  <Text style={[styles.documentDescription, {color: theme.textLight}]}>
                    {doc.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'savingsPlan':
        return (
          <View style={styles.visualContainer}>
            <View style={styles.savingsHeader}>
              <TrendingUp size={16} color={theme.secondary} />
              <Text style={[styles.visualTitle, {color: theme.text}]}>
                Savings Plan
              </Text>
            </View>
            
            <View style={styles.savingsGoalContainer}>
              <Text style={styles.savingsLabel}>Current Monthly Savings:</Text>
              <Text style={[styles.savingsAmountCurrent, {color: theme.red}]}>
                RM {message.visualData.currentSavings}
              </Text>
              
              <Text style={styles.savingsLabel}>Recommended Monthly Savings:</Text>
              <Text style={[styles.savingsAmountTarget, {color: theme.secondary}]}>
                RM {message.visualData.targetSavings}
              </Text>
            </View>
            
            <Text style={[styles.savingsTips, {color: theme.text}]}>
              Suggested Adjustments:
            </Text>
            
            {message.visualData.suggestions.map((suggestion: any, index: number) => (
              <View key={index} style={styles.savingSuggestionRow}>
                <Text style={styles.savingCategory}>{suggestion.category}</Text>
                <View style={styles.savingValues}>
                  <Text style={{color: theme.textLight}}>
                    RM{suggestion.current} → RM{suggestion.suggested}
                  </Text>
                  <Text style={[styles.savingAmount, {color: theme.teal}]}>
                    Save RM{suggestion.saving}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'aidPrograms':
        return (
          <View style={styles.visualContainer}>
            <View style={styles.programsHeader}>
              <Award size={16} color={theme.secondary} />
              <Text style={[styles.visualTitle, {color: theme.text}]}>
                Eligible Aid Programs
              </Text>
            </View>
            
            {message.visualData.programs.map((program: any, index: number) => (
              <TouchableOpacity key={index} style={styles.programCard}>
                <Text style={[styles.programName, {color: theme.primary}]}>
                  {program.name}
                </Text>
                <View style={styles.programDetails}>
                  <Text style={styles.programAmount}>Benefit: {program.amount}</Text>
                  <Text style={[styles.programDeadline, {color: theme.textLight}]}>
                    Deadline: {program.deadline}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={[
      styles.container, 
      message.isUser ? styles.userContainer : styles.botContainer
    ]}>
      <View style={[
        styles.bubble, 
        message.isUser 
          ? [styles.userBubble, {backgroundColor: theme.primary}] 
          : [styles.botBubble, {backgroundColor: theme.cardBackground}]
      ]}>
        {renderIcon()}
        
        <Text style={[
          styles.text, 
          message.isUser 
            ? styles.userText 
            : [styles.botText, {color: theme.text}]
        ]}>
          {message.text}
        </Text>
        
        {renderVisualData()}
        
        <Text style={[
          styles.timestamp, 
          message.isUser 
            ? styles.userTimestamp 
            : [styles.botTimestamp, {color: theme.textLight}]
        ]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 2,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  botContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  botTimestamp: {
    color: '#8E8E93',
  },
  iconContainer: {
    marginBottom: 8,
  },
  visualContainer: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
  visualTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  eligibilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eligibilityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  eligibilityStatusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  criterionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  criterionLabel: {
    fontSize: 14,
    flex: 1,
  },
  criterionValue: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  criterionStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  criterionStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deadlineContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  deadlineText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  documentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  documentBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 10,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  documentDescription: {
    fontSize: 13,
  },
  savingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  savingsGoalContainer: {
    marginBottom: 12,
  },
  savingsLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  savingsAmountCurrent: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  savingsAmountTarget: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  savingsTips: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  savingSuggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  savingCategory: {
    fontSize: 14,
  },
  savingValues: {
    alignItems: 'flex-end',
  },
  savingAmount: {
    fontWeight: '600',
    marginTop: 2,
  },
  programsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  programCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  programName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  programDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  programAmount: {
    fontSize: 13,
    flex: 1,
  },
  programDeadline: {
    fontSize: 13,
  },
});
