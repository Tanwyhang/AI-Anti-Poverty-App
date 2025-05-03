import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import { isWeb } from '../utils/platform';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ 
  progress, 
  size = 120,
  strokeWidth = 12,
  progressColor = '#0EA5E9',
  backgroundColor = '#E5E5EA'
}) => {
  // Ensure progress is between 0 and 1
  const validProgress = Math.min(Math.max(progress, 0), 1);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (circumference * validProgress);
  
  const center = size / 2;
  
  // Apply web-specific styles if needed
  const webStyles = isWeb ? {
    transform: `rotate(-90deg)`,
    transformOrigin: 'center center'
  } : {
    transform: [{ rotate: '-90deg' }]
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={webStyles}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
