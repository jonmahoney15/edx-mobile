import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingComponent = ({ isLoading, children }) => {
  return (
    <View style={{ flex: 1}}>
      {isLoading ? <ActivityIndicator size="large" color="white" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/> : children}
    </View>
  );
};

export default LoadingComponent;