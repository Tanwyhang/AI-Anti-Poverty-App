import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProgressCircle } from '../../components/ProgressCircle';
import { Task, TaskItem } from '../../components/TaskItem';

// Theme colors
const theme = {
  primary: "#0284C7", // Blue
  secondary: "#0EA5E9", // Light blue
  teal: "#0D9488", // Teal
  tealLight: "#5EEAD4", // Light teal
  background: "#F0F9FF",
  text: "#0C4A6E",
  textLight: "#64748B",
  cardBackground: "#F0FDFF",
};

// Enhanced task data with AI suggestions and infographics
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Apply for Sumbangan Tunai Rahmah (STR)',
    description: 'Submit application via official portal at https://bantuanrakyat.gov.my',
    dueDate: 'March 31, 2024',
    completed: false,
    aiSuggestion: 'Make sure to have your IC, bank account details, and household information ready before applying. Complete the application in one session to avoid data loss.',
    benefitAmount: 'RM 2,000',
    successRate: 85,
    difficulty: 'easy',
    estimatedTime: '30 minutes',
  },
  {
    id: '2',
    title: 'Register for Skills Training Program',
    description: 'Enroll in GIATMARA digital skills training program',
    dueDate: 'April 15, 2024',
    completed: false,
    aiSuggestion: 'Digital skills programs have the highest job placement rates. Consider web development or data entry courses as they align with your previous work experience.',
    benefitAmount: 'Job Opportunity',
    successRate: 70,
    difficulty: 'medium',
    estimatedTime: '2 weeks training',
  },
  {
    id: '3',
    title: 'Update Bank Account Information',
    description: 'Ensure BSN account is active for aid disbursement',
    dueDate: 'Immediately',
    completed: true,
    aiSuggestion: 'Bring your IC and existing bank account details. Request for e-statement activation to track incoming aid payments.',
    benefitAmount: 'All Eligible Aid',
    successRate: 95,
    difficulty: 'easy',
    estimatedTime: '20 minutes',
  },
  {
    id: '4',
    title: 'Attend Financial Literacy Workshop',
    description: 'Join the online session by Bank Negara Malaysia',
    dueDate: 'May 5, 2024',
    completed: false,
    aiSuggestion: 'Take notes during the budgeting section as it will be most relevant to your situation. The workshop also provides free financial planning tools.',
    benefitAmount: 'Knowledge',
    successRate: 60,
    difficulty: 'easy',
    estimatedTime: '3 hours',
  },
  {
    id: '5',
    title: 'Apply for Affordable Housing Scheme',
    description: 'Submit application for Rumah Mesra Rakyat program',
    dueDate: 'June 30, 2024',
    completed: false,
    aiSuggestion: 'Focus on locations in Kajang or Bangi which have better approval rates. Include all children as dependents even if they work part-time.',
    benefitAmount: 'Housing Subsidy',
    successRate: 50,
    difficulty: 'hard',
    estimatedTime: '2-3 months',
  },
  {
    id: '6',
    title: 'Schedule Healthcare Checkup',
    description: 'Use PeKa B40 benefits at nearest clinic',
    dueDate: 'April 20, 2024',
    completed: false,
    aiSuggestion: 'Request a full health screening which is covered under the program. Bring your B40 status confirmation letter to avoid unnecessary charges.',
    benefitAmount: 'Free Healthcare',
    successRate: 90,
    difficulty: 'easy',
    estimatedTime: '2 hours',
  },
];

export default function PlanScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  // Calculate progress
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? completedTasks / tasks.length : 0;
  
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Feather name="clipboard" size={28} color={theme.primary} style={styles.titleIcon} />
            <View>
              <Text style={[styles.title, { color: theme.text }]}>Your Action Plan</Text>
              <Text style={[styles.subtitle, { color: theme.textLight }]}>
                Personalized steps to improve your financial situation
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <View style={styles.progressCircleContainer}>
            <ProgressCircle 
              progress={progress} 
              progressColor={theme.teal}
              size={144} 
              strokeWidth={4}
            />
            <View style={styles.progressIconContainer}/>
          </View>
            <Text style={[styles.progressText, { color: theme.textLight }, {paddingHorizontal: 20}]}>
              <Text style={{ fontWeight: '700', color: theme.teal }}>{completedTasks} of {tasks.length}</Text> tasks completed
              <Feather name="check-circle" style={{ padding: 10 }} size={32} color={theme.teal} />
            </Text>
        </View>
        
        <View style={styles.tasksContainer}>
          <View style={styles.sectionTitleContainer}>
            <Feather name="list" size={22} color={theme.primary} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Tasks generated by </Text>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>AI</Text>
            
          </View>
          
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask}
              colors={{
                completed: theme.teal,
                uncompleted: theme.primary,
                background: theme.cardBackground,
                text: theme.text,
                textLight: theme.textLight,
                primary: theme.primary,
                secondary: theme.secondary,
                teal: theme.teal,
              }}
            />
          ))}
        </View>
        
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  progressSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  progressCircleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 16,
    marginTop: 16,
  },
  tasksContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    height: 32,
  },
});
