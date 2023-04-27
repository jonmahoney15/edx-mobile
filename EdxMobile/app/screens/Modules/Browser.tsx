import React from 'react';
import { WebView } from 'react-native-webview'

interface IBrowserProps {
  url: string;
}

export const Browser = (props: IBrowserProps) => {
  const run = `
    window.onload = function() {
      document.getElementsByClassName("global-header")[0].style.display = "none";
    };
    true;
  `;

  return <WebView
    source={{ uri: 'http://demo.edxmobile.com/courses/course-v1:edX+DemoX+Demo_Course/' }}
    // source={{ uri: props.url }}
    style={{ flex: 1 }}
    onMessage={(event) => {
      console.log('event: ', event)
    }}
    injectedJavaScript={run}
  />
}
