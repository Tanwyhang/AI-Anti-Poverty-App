import { Award, BarChart, Check, ChevronDown, ChevronUp, Clock, Lightbulb, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getResponderProps } from '../utils/platform';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  aiSuggestion?: string;
  benefitAmount?: string;
  successRate?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedTime?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  colors?: {
    completed?: string;
    uncompleted?: string;
    background?: string;
    text?: string;
    textLight?: string;
    primary?: string;
    secondary?: string;
    teal?: string;
  };
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggle,
  colors = {
    completed: '#007AFF',
    uncompleted: '#007AFF',
    background: '#FFFFFF',
    text: '#000',
    textLight: '#8E8E93',
    primary: '#0284C7',
    secondary: '#0EA5E9',
    teal: '#0D9488',
  } 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Adjust based on content height
  });

  const getProgressColor = (rate?: number) => {
    if (!rate) return colors.textLight;
    if (rate > 80) return colors.teal;
    if (rate > 50) return colors.secondary;
    return '#FF9500'; // Orange for lower rates
  };
  
  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return colors.textLight;
    if (difficulty === 'easy') return '#34C759'; // Green
    if (difficulty === 'medium') return '#FF9500'; // Orange
    return '#FF3B30'; // Red for hard
  };

  const renderDifficultyDots = (difficulty?: string) => {
    const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    const color = getDifficultyColor(difficulty);
    
    return (
      <View style={styles.difficultyDots}>
        {[...Array(3)].map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.dot, 
              { backgroundColor: i < count ? color : '#E5E5EA' }
            ]} 
          />
        ))}
      </View>
    );
  };

  const renderProgressBar = (rate?: number) => {
    if (!rate) return null;
    
    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${rate}%`, 
                backgroundColor: getProgressColor(rate) 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressPercent}>{rate}%</Text>
      </View>
    );
  };

  return (
    <View style={[
      styles.container, 
      task.completed && styles.completedContainer,
      { backgroundColor: colors.background }
    ]}>
      <TouchableOpacity 
        style={styles.mainContent}
        onPress={toggleExpand}
        activeOpacity={0.7}
        {...getResponderProps()} // Add responder props safely
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={[
              styles.checkbox, 
              { borderColor: colors.uncompleted },
              task.completed && { backgroundColor: colors.completed, borderColor: colors.completed }
            ]}
            onPress={() => onToggle(task.id)}
            {...getResponderProps()} // Add responder props safely
          >
            {task.completed && <Check size={16} color="#FFFFFF" />}
          </TouchableOpacity>
          
          <View style={styles.content}>
            <Text 
              style={[
                styles.title, 
                { color: colors.text },
                task.completed && [styles.completedText, { color: colors.textLight }]
              ]}
            >
              {task.title}
            </Text>
            <Text 
              style={[
                styles.description, 
                { color: colors.textLight },
                task.completed && styles.completedText
              ]}
              numberOfLines={expanded ? undefined : 2}
            >
              {task.description}
            </Text>
            
            {task.dueDate && (
              <View style={styles.dueDate}>
                <Clock size={14} color={colors.textLight} style={styles.clockIcon} />
                <Text style={[styles.dueDateText, { color: colors.textLight }]}>Due: {task.dueDate}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.expandIcon}>
            {expanded ? 
              <ChevronUp size={20} color={colors.textLight} /> : 
              <ChevronDown size={20} color={colors.textLight} />
            }
          </View>
        </View>
      </TouchableOpacity>
      
      <Animated.View style={{ maxHeight, overflow: 'hidden' }}>
        <View style={styles.expandedContent}>
          <View style={styles.divider} />
          
          {/* AI Suggestion Section */}
          {task.aiSuggestion && (
            <View style={styles.suggestionContainer}>
              <View style={styles.suggestionHeader}>
                <Lightbulb size={18} color={colors.secondary} />
                <Text style={[styles.sectionTitle, { color: colors.secondary }]}>AI Suggestion</Text>
              </View>
              <Text style={[styles.suggestionText, { color: colors.text }]}>
                {task.aiSuggestion}
              </Text>
            </View>
          )}
          
          {/* Infographics Section */}
          <View style={styles.infographicsContainer}>
            {/* Row 1 */}
            <View style={styles.infographicRow}>
              {task.benefitAmount && (
                <View style={styles.infographicItem}>
                  <Award size={20} color={colors.teal} />
                  <Text style={styles.infographicLabel}>Potential Benefit</Text>
                  <Text style={[styles.infographicValue, { color: colors.teal }]}>{task.benefitAmount}</Text>
                </View>
              )}
              
              {task.difficulty && (
                <View style={styles.infographicItem}>
                  <Zap size={20} color={getDifficultyColor(task.difficulty)} />
                  <Text style={styles.infographicLabel}>Difficulty</Text>
                  <View style={styles.difficultyContainer}>
                    <Text style={styles.difficultyText}>
                      {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                    </Text>
                    {renderDifficultyDots(task.difficulty)}
                  </View>
                </View>
              )}
            </View>
            
            {/* Row 2 */}
            <View style={styles.infographicRow}>
              {task.estimatedTime && (
                <View style={styles.infographicItem}>
                  <Clock size={20} color={colors.primary} />
                  <Text style={styles.infographicLabel}>Est. Time Required</Text>
                  <Text style={[styles.infographicValue, { color: colors.primary }]}>{task.estimatedTime}</Text>
                </View>
              )}
              
              {task.successRate !== undefined && (
                <View style={styles.infographicItem}>
                  <BarChart size={20} color={getProgressColor(task.successRate)} />
                  <Text style={styles.infographicLabel}>Success Rate</Text>
                  {renderProgressBar(task.successRate)}
                </View>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: '#F2F2F7',
  },
  mainContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  dueDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 4,
  },
  dueDateText: {
    fontSize: 12,
  },
  expandIcon: {
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedContent: {
    padding: 16,
    paddingTop: 0,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 12,
  },
  suggestionContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#D7F2FEFF',
    borderRadius: 8,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  infographicsContainer: {
    marginTop: 8,
  },
  infographicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infographicItem: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
  },
  infographicLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    marginBottom: 2,
  },
  infographicValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    flex: 1,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  difficultyDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
});
