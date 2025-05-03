import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface CardProps {
  title?: React.ReactNode; // Changed from string to React.ReactNode
  titleMalay?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ title, titleMalay, children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.titleContainer}>
          {typeof title === 'string' ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            title // Render the ReactNode directly
          )}
          {titleMalay && <Text style={styles.titleMalay}>{titleMalay}</Text>}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titleContainer: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  titleMalay: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});
