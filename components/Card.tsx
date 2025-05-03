import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CardProps {
  title?: string;
  titleMalay?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  titleMalay, 
  children, 
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.card, style]}>
      {(title || titleMalay) && (
        <View style={styles.titleContainer}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {titleMalay && <Text style={styles.titleMalay}>{titleMalay}</Text>}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  titleContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  titleMalay: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
    marginTop: 2,
  },
});
