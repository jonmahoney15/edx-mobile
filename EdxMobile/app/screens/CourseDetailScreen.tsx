import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Platform } from 'react-native';
import React, { FC, useEffect, useState } from "react";
import { AppStackScreenProps, goBack } from "../navigators"
import { observer } from "mobx-react-lite"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { PrettyHeader } from "../components/PrettyHeader"
import { Course } from "../models/Course"
import { Animated } from 'react-native';
import { colors } from "../theme/colors"
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../services/api'
import { useStores } from "../models"

const hardCodedCourse =
    [
      {
        id: '1',
        display_name: 'Getting Started',
        duration: '1h 30m',
        videoId: '6oFuwhIibo4',
        bodyText: 'In this module, you will learn the fundamentals of React Native, including how to set up your development environment and create your first mobile app. You will explore the basic syntax and structure of React Native components and learn how to use them to build simple user interfaces. By the end of this module, you will have a solid foundation in React Native and be ready to move on to more advanced topics.',
      },
      {
        id: '2',
        display_name: 'Building UI with Components',
        duration: '2h 15m',
        videoId: 'eAXow8r3lYY',
        bodyText: 'In this module, you will dive deeper into React Native components and learn how to use them to create complex and beautiful user interfaces. you will explore various built-in components like text, images, buttons, and inputs, and learn how to style them using CSS-like syntax. you will also learn how to create custom components by composing multiple existing components. By the end of this module, you will have the skills to build a variety of user interfaces for your mobile app.',
      },
      {
        id: '3',
        display_name: 'Navigating Between Screens',
        duration: '1h 45m',
        videoId: 'OmQCU-3KPms',
        bodyText: 'In this module, you will learn how to create multi-screen mobile apps using React Navigation, a popular library for navigation in React Native. you will explore various navigation patterns like stack navigation, tab navigation, and drawer navigation, and learn how to implement them using React Navigation. you will also learn how to pass data between screens and handle navigation events like back button presses. By the end of this module, you will be able to create sophisticated navigation flows for your mobile app.',
      },
      {
        id: '4',
        display_name: 'Managing State with Redux',
        duration: '2h 30m',
        videoId: 'BtJoy4G3N8U',
        bodyText: 'In this module, you will learn how to manage the state of your React Native app using Redux, a popular library for state management in React. you will explore the basic concepts of Redux like store, actions, and reducers, and learn how to use them to manage complex state in your app. you will also learn how to integrate Redux with React Native components using the React-Redux library. By the end of this module, you will have the skills to manage the state of your mobile app in a scalable and maintainable way.',
      },
    ];

interface ICourseDetailsParams {
  id: string;
  title: string;
  url: string;
}

function FetchCourseDetailFromApi(course_id) {
  const course: Course = {
    course_id: '3123123',
    id: '1',
    name: 'Introduction to React Native',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'Learn the basics of building mobile apps with React Native.',
    modules: [
      {
        id: '1',
        title: 'Getting Started',
        duration: '1h 30m',
        videoId: '6oFuwhIibo4',
        bodyText: 'In this module, you will learn the fundamentals of React Native, including how to set up your development environment and create your first mobile app. You will explore the basic syntax and structure of React Native components and learn how to use them to build simple user interfaces. By the end of this module, you will have a solid foundation in React Native and be ready to move on to more advanced topics.',
        submodules: [
          {
            id: '1.1',
            title: 'Installing React Native',
            duration: '10m',
            videoId: 'abc123',
            bodyText: 'In this submodule, you will learn how to install React Native on your computer. You will get an overview of the tools and software needed to set up your development environment and start building mobile apps. By the end of this submodule, you will have a working React Native installation on your computer and be ready to create your first mobile app.',
            moduleId: '1'
          },
          {
            id: '1.2',
            title: 'Creating a New React Native Project',
            duration: '15m',
            videoId: 'def456',
            bodyText: 'In this submodule, you will learn how to create a new React Native project and run it on an emulator. You will explore the different components of a React Native project and learn how to use the command-line interface to generate a new project. By the end of this submodule, you will have a working React Native app running on an emulator and be ready to start building the user interface.',
            moduleId: '1'
          },
        ],
      },
      {
        id: '2',
        title: 'Building UI with Components',
        duration: '2h 15m',
        videoId: 'eAXow8r3lYY',
        bodyText: 'In this module, you will dive deeper into React Native components and learn how to use them to create complex and beautiful user interfaces. you will explore various built-in components like text, images, buttons, and inputs, and learn how to style them using CSS-like syntax. you will also learn how to create custom components by composing multiple existing components. By the end of this module, you will have the skills to build a variety of user interfaces for your mobile app.',
        submodules: [
          {
            id: '2.1',
            title: 'Exploring Built-in Components',
            duration: '10m',
            videoId: 'abc123',
            bodyText: 'In this submodule, you will learn about various built-in components like text, images, buttons, and inputs in React Native. You will explore their properties and methods and learn how to use them to build simple user interfaces.',
            moduleId: '2'
          },
          {
            id: '2.2',
            title: 'Styling Components with CSS',
            duration: '10m',
            videoId: 'abc123',
            bodyText: 'In this submodule, you will learn how to style React Native components using a CSS-like syntax. You will explore various styling properties like font size, color, background, padding, margin, and learn how to use them to create beautiful user interfaces for your mobile app.',
            moduleId: '2'
          },
          {
            id: '2.3',
            title: 'Creating Custom Components',
            duration: '10m',
            videoId: 'abc123',
            bodyText: ' In this submodule, you will learn how to create custom components by composing multiple existing components in React Native. You will explore various techniques like props, state, and lifecycle methods and learn how to use them to build complex and reusable components for your mobile app.',
            moduleId: '2'
          },
        ],
      },
      {
        id: '3',
        title: 'Navigating Between Screens',
        duration: '1h 45m',
        videoId: 'OmQCU-3KPms',
        bodyText: 'In this module, you will learn how to create multi-screen mobile apps using React Navigation, a popular library for navigation in React Native. you will explore various navigation patterns like stack navigation, tab navigation, and drawer navigation, and learn how to implement them using React Navigation. you will also learn how to pass data between screens and handle navigation events like back button presses. By the end of this module, you will be able to create sophisticated navigation flows for your mobile app.',
        submodules: [
          {
            id: '3.1',
            title: 'Stack Navigation',
            duration: '10m',
            videoId: 'abc123',
            bodyText: 'In this submodule, you will learn to implement a navigation stack to enable seamless transitions between different screens in their React Native app. You will learn how to define the navigation stack, push and pop screens onto and off of the stack, pass data between screens, and customize the navigation header. By the end of this submodule, you will have the skills to create sophisticated navigation flows for their mobile app.',
            moduleId: '3'
          },
        ],
      },
      {
        id: '4',
        title: 'Managing State with Redux',
        duration: '2h 30m',
        videoId: 'BtJoy4G3N8U',
        bodyText: 'In this module, you will learn how to manage the state of your React Native app using Redux, a popular library for state management in React. you will explore the basic concepts of Redux like store, actions, and reducers, and learn how to use them to manage complex state in your app. you will also learn how to integrate Redux with React Native components using the React-Redux library. By the end of this module, you will have the skills to manage the state of your mobile app in a scalable and maintainable way.',
        submodules: [
          {
            id: '4.1',
            title: 'Understanding Redux Concepts',
            duration: '10m',
            videoId: 'abc123',
            bodyText: 'In this submodule, you will learn the basic concepts of Redux, a popular library for state management in React. You will explore the different components of a Redux store, including actions, reducers, and the store itself, and learn how they work together to manage the state of your app. By the end of this submodule, you will have a solid understanding of Redux and be ready to integrate it into your React Native app.',
            moduleId: '4'
          },
          {
            id: '4.2',
            title: 'Implementing Redux in a React Native App',
            duration: '10m',
            videoId: 'abc123',
            bodyText: 'In this submodule, you will learn how to manage the state of your React Native app using Redux, a popular library for state management in React. You will explore the basic concepts of Redux like store, actions, and reducers, and learn how to use them to manage complex state in your app. By the end of this submodule, you will have the skills to manage the state of your mobile app in a scalable and maintainable way, making your app easier to develop, test, and maintain.',
            moduleId: '4'
          },
        ],
      },
    ]
  }
  return course
}

const backgroundImage = require("../../assets/images/futuristic_library_technology.png")

interface CourseDetailScreenProps extends AppStackScreenProps<"CourseDetail"> { }

export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function CourseDetailScreen(
  _props
) {
  const { navigation } = _props
  const { id, title, url }  = _props.route.params as ICourseDetailsParams;
  const [course, setCourse] = useState([]);
  const course_id = _props.route.params.id;
  // @ts-ignore
  const course_hard_coded: Course = FetchCourseDetailFromApi(course_id);
  const [checkedModules, setCheckedModules] = useState<string[]>([]);

  const {
    authenticationStore: { authToken },
    userStore: { username }
  } = useStores()

  const [checkedSubModules, setCheckedSubModules] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const FetchCourseDetailFromApi = async () => {
    await api.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          params: {
            username: username,
            student_view_data: 'video',
            depth: 'all'
          },
          validateStatus: function (status) {
            return status < 500;
          }
        }
      ).then(response => {
        //@ts-ignore
        const modules = Object.values(response.data.blocks).filter(item => item.type === "chapter");
        setCourse(modules)
      })
      .catch((e) => {
        console.log('In Login Error:');
        setCourse(hardCodedCourse);
      }
    );
  }

  const handleModulePress = (module) => {
    if (course_hard_coded.modules.length > 0) {
      navigation.navigate('Module', {
        id: module.id,
        title: module.title,
        duration: module.duration,
        videoId: module.videoId,
        bodyText: module.bodyText,
      });
    }
  };

  const handleSubModulePress = (submodule) => {
    if (course_hard_coded.modules.length > 0) {
      navigation.navigate('Module', {
        id: submodule.id,
        title: submodule.title,
        duration: submodule.duration,
        videoId: submodule.videoId,
        bodyText: submodule.bodyText,
      });
    }
  };

  const toggleModuleChecked = (moduleId: string) => {
    if (checkedModules.includes(moduleId)) {
      setCheckedModules(checkedModules.filter(id => id !== moduleId));
    } else {
      setCheckedModules([...checkedModules, moduleId]);
    }
  };

  const toggleSubModuleChecked = (subModuleId: string) => {
    if (checkedSubModules.includes(subModuleId)) {
      setCheckedSubModules(checkedSubModules.filter(id => id !== subModuleId));
    } else {
      setCheckedSubModules([...checkedSubModules, subModuleId]);
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  useEffect(() => {
    FetchCourseDetailFromApi()
  }, [])

  const toggleSubmoduleList = (moduleId: string) => {
    setExpandedModules(expandedModules.includes(moduleId)
      ? expandedModules.filter((id) => id !== moduleId)
      : [...expandedModules, moduleId]
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <PrettyHeader
        title={course_hard_coded.name}
        theme='black'
        onLeftPress={goBack}
        onRightPress={handleProfilePress}
      />
      <View style={styles.beginContainer}>
        <Text style={styles.beginCourse}>Begin Your course today</Text>
        <TouchableOpacity onPress={() => handleModulePress(course_hard_coded.modules[0])}>
          <View style={styles.startContainer}>
            <Text style={styles.viewCourse}>Start Course</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.textContainer}>
          <FlatList
            data={course_hard_coded.modules}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.moduleContainer, { flexDirection: 'column' }]}
                onPress={() => handleModulePress(item)}
              >
                <View style={styles.component1}>
                  {checkedModules.includes(item.id) && (
                    <TouchableOpacity onPress={() => toggleModuleChecked(item.id)}>
                      <MaterialCommunityIcons name="check-circle" size={20} color="#000" />
                    </TouchableOpacity>
                  )}
                  {!checkedModules.includes(item.id) && (
                    <TouchableOpacity onPress={() => toggleModuleChecked(item.id)}>
                      <MaterialCommunityIcons name="circle" size={20} color="#000" />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.title}>{item.title}</Text>
                  <TouchableOpacity onPress={() => toggleSubmoduleList(item.id)}>
                    <MaterialCommunityIcons name="plus" size={22} color="#000" />
                  </TouchableOpacity>
                </View>
                {expandedModules.includes(item.id) && (
                  <Animated.View style={[styles.submoduleListContainer, {
                    overflow: 'hidden',
                  }]}>
                    <FlatList
                      data={item.submodules}
                      keyExtractor={(submodule) => submodule.id}
                      renderItem={({ item: submodule }) => (
                        <TouchableOpacity
                          style={styles.submoduleContainer}
                          onPress={() => handleSubModulePress(submodule)}
                        >
                          <View style={styles.component2}>
                            {checkedSubModules.includes(submodule.id) && (
                              <TouchableOpacity onPress={() => toggleSubModuleChecked(submodule.id)}>
                                <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />
                              </TouchableOpacity>
                            )}
                            {!checkedSubModules.includes(submodule.id) && (
                              <TouchableOpacity onPress={() => toggleSubModuleChecked(submodule.id)}>
                                <MaterialCommunityIcons name="circle" size={20} color="#fff" />
                              </TouchableOpacity>
                            )}
                            <Text style={styles.submoduleTitle}>{submodule.title}</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </Animated.View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View >
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  component1: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(133, 213, 190, 0.71)',
    borderRadius: 24,
    paddingHorizontal: 20,
  },
  component2: {
    // width: '100%',
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 24,
    // paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    color: '#000000',
    marginLeft: 15
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#000',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
  moduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 5,
    borderRadius: 8,
  },
  beginContainer: {
    margin: 20,
    marginBottom: 0,
    marginTop: 110,
    width: 336,
    height: 110,
    backgroundColor: '#282424',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  beginCourse: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  startContainer: {
    backgroundColor: '#FFB267',
    borderRadius: 100,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  viewCourse: {
    fontStyle: 'normal',
    fontSize: 15,
    textAlign: 'center',
  },
  submoduleListContainer: {
    paddingVertical: 5,
    backgroundColor: '#393535',
    borderRadius: 24,
    overflow: 'hidden',
    marginLeft: 40,
  },
  submoduleContainer: {
    padding: 8,
    paddingRight: 12,
    paddingLeft: 12,
    borderBottomWidth: 0.5,
    width: 280,
  },
  submoduleTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: '#FFFFFF'
  }
});

export default CourseDetailScreen;
