import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

/**
 * Root index file that redirects to the tabbed navigation
 * Could be extended to include splash logic, authentication checks, etc.
 */

export default function Index() {
  // You could add initialization logic here if needed
  // For example, loading user data, checking auth status, etc.

  return (
    <View style={styles.container}>
      
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading your financial planner...</Text>
      
      {/* This will automatically redirect users to the tab navigation */}
      <Redirect href="/(tabs)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
});
