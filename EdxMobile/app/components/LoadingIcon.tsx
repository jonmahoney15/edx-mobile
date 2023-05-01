import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const LoadingIcon = ({ isLoading, children }) => {
  return (
    <View style={{ flex: 1, height: 500}}>
      {isLoading ? <ActivityIndicator size="large" color="white" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}/> : children}
    </View>
  );
};
