import React from 'react';
import { WebView } from 'react-native-webview'

interface IBrowserProps {
  url: string;
}

export const Browser = (props: IBrowserProps) => {
  return <WebView source={{ uri: props.url }} style={{flex: 1}}/>
}
