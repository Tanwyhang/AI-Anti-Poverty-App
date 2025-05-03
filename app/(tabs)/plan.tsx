import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressCircle } from '../../components/ProgressCircle';
import { Task, TaskItem } from '../../components/TaskItem';

// Sample task data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Apply for Sumbangan Tunai Rahmah (STR)',
    description: 'Submit application via official portal at https://bantuanrakyat.gov.my',
    dueDate: 'March 31, 2024',
    completed: false,
  },
  {
    id: '2',
    title: 'Register for Skills Training Program',
    description: 'Enroll in GIATMARA digital skills training program',
    dueDate: 'April 15, 2024',
    completed: false,
  },
  {
    id: '3',
    title: 'Update Bank Account Information',
    description: 'Ensure BSN account is active for aid disbursement',
    dueDate: 'Immediately',
    completed: true,
  },
  {
    id: '4',
    title: 'Attend Financial Literacy Workshop',
    description: 'Join the online session by Bank Negara Malaysia',
    dueDate: 'May 5, 2024',
    completed: false,
  },
  {
    id: '5',
    title: 'Apply for Affordable Housing Scheme',
    description: 'Submit application for Rumah Mesra Rakyat program',
    dueDate: 'June 30, 2024',
    completed: false,
  },
  {
    id: '6',
    title: 'Schedule Healthcare Checkup',
    description: 'Use PeKa B40 benefits at nearest clinic',
    dueDate: 'April 20, 2024',
    completed: false,
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Your Action Plan</Text>
          <Text style={styles.subtitle}>
            Personalized steps to improve your financial situation
          </Text>
        </View>
        
        <View style={styles.progressSection}>
          <ProgressCircle progress={progress} />
          <Text style={styles.progressText}>
            {completedTasks} of {tasks.length} tasks completed
          </Text>
        </View>
        
        <View style={styles.tasksContainer}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
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
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  progressSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  progressText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 16,
  },
  tasksContainer: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  footer: {
    height: 32,
  },
});
