import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';

export const getWebStyles = (styles: any) => {
  if (!isWeb) return {};
  
  // Convert any kebab-case to camelCase for web
  const webStyles: any = {};
  
  // Safe transform properties for web
  return {
    // Common properties that need conversion
    transformOrigin: 'center center',
    // Add any other web-specific styles as needed
  };
};

export const getResponderProps = () => {
  if (isWeb) return {};
  
  // These props cause warnings on web but are needed on native
  return {
    onStartShouldSetResponder: () => true,
    onResponderTerminationRequest: () => false,
    onResponderGrant: () => {},
    onResponderMove: () => {},
    onResponderRelease: () => {},
    onResponderTerminate: () => {},
  };
};
