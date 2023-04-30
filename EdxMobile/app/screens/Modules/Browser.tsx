import React from 'react';
import { WebView } from 'react-native-webview'

interface IBrowserProps {
  url: string;
}

export const Browser = (props: IBrowserProps) => {
  const run = `
    window.onload = function() {
      let nodeList = document.querySelectorAll("body, div, p, header");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.backgroundColor = "black";
      }
      
    };
    true;
  `;

  return <WebView
    // source={{ uri: 'http://demo.edxmobile.com/courses/course-v1:edX+DemoX+Demo_Course/' }}
    source={{ uri: props.url }}
    style={{ flex: 1, backgroundColor: 'transparent' }}
    onMessage={(event) => {}}
    // injectedJavaScript={run}
  />
}
