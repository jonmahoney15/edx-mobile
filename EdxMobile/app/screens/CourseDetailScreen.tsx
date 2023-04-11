import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { AppStackScreenProps, goBack } from "../navigators"
import { observer } from "mobx-react-lite"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { PrettyHeader } from "../components/PrettyHeader"
import { Course } from "../models/Course"

function FetchCourseDetailFromApi(course_id) {
  const course: Course = {
    id: '3123123',
    title: 'Introduction to React Native',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'Learn the basics of building mobile apps with React Native.',
    modules: [
      {
        id: '1',
        title: 'Getting Started',
        duration: '1h 30m',
        videoId: '6oFuwhIibo4',
        bodyText: 'In this module, you will learn the fundamentals of React Native, including how to set up your development environment and create your first mobile app. You will explore the basic syntax and structure of React Native components and learn how to use them to build simple user interfaces. By the end of this module, you will have a solid foundation in React Native and be ready to move on to more advanced topics.',
      },
      {
        id: '2',
        title: 'Building UI with Components',
        duration: '2h 15m',
        videoId: 'eAXow8r3lYY',
        bodyText: 'In this module, you will dive deeper into React Native components and learn how to use them to create complex and beautiful user interfaces. you will explore various built-in components like text, images, buttons, and inputs, and learn how to style them using CSS-like syntax. you will also learn how to create custom components by composing multiple existing components. By the end of this module, you will have the skills to build a variety of user interfaces for your mobile app.',
      },
      {
        id: '3',
        title: 'Navigating Between Screens',
        duration: '1h 45m',
        videoId: 'OmQCU-3KPms',
        bodyText: 'In this module, you will learn how to create multi-screen mobile apps using React Navigation, a popular library for navigation in React Native. you will explore various navigation patterns like stack navigation, tab navigation, and drawer navigation, and learn how to implement them using React Navigation. you will also learn how to pass data between screens and handle navigation events like back button presses. By the end of this module, you will be able to create sophisticated navigation flows for your mobile app.',
      },
      {
        id: '4',
        title: 'Managing State with Redux',
        duration: '2h 30m',
        videoId: 'BtJoy4G3N8U',
        bodyText: 'In this module, you will learn how to manage the state of your React Native app using Redux, a popular library for state management in React. you will explore the basic concepts of Redux like store, actions, and reducers, and learn how to use them to manage complex state in your app. you will also learn how to integrate Redux with React Native components using the React-Redux library. By the end of this module, you will have the skills to manage the state of your mobile app in a scalable and maintainable way.',
      },
    ]
  }
  return course
}

interface CourseDetailScreenProps extends AppStackScreenProps<"CourseDetail"> { }

export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function CourseDetailScreen(
  _props
) {
  const { navigation } = _props
  const course_id = _props.route.params.id;
  const course: Course = FetchCourseDetailFromApi(course_id);
  const [checkedModules, setCheckedModules] = useState<string[]>([]);

  const handleModulePress = (module) => {
    console.log(module)
    if (course.modules.length > 0) {
      navigation.navigate('Module', {
        id: module.id,
        title: module.title,
        duration: module.duration,
        videoId: module.videoId,
        bodyText: module.bodyText,
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

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <ImageBackground source={require('../../assets/images/futuristic_library_technology.png')} style={styles.container}>
      <PrettyHeader
        title={course.title}
        theme='black'
        onLeftPress={goBack}
        onRightPress={handleProfilePress}
      />
      <View style={styles.beginContainer}>
        <Text style={styles.beginCourse}>Begin Your course today</Text>
        <TouchableOpacity onPress={() => handleModulePress(course.modules[0])}>
          <View style={styles.startContainer}>
            <Text style={styles.viewCourse}>Start Course</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.textContainer}>
          <FlatList
            data={course.modules}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.moduleContainer}
                onPress={() => handleModulePress(item)}
              >
                <View style={styles.component1}>
                  {checkedModules.includes(item.id) && (
                    <TouchableOpacity onPress={() => toggleModuleChecked(item.id)}>
                      <MaterialCommunityIcons name="check-circle" size={20} color="#000"/>
                    </TouchableOpacity>
                  )}
                  {!checkedModules.includes(item.id) && (
                    <TouchableOpacity onPress={() => toggleModuleChecked(item.id)}>
                      <MaterialCommunityIcons name="circle" size={20} color="#000"/>
                    </TouchableOpacity>
                  )}
                  <Text style={styles.title}>{item.title}</Text>
                </View>
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
    marginBottom: -25,
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
    marginTop: 40,
    flex: 1,
    padding: 8,
  },
  moduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 0,
  },
  beginContainer: {
    margin: 50,
    marginBottom: 0,
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
});

export default CourseDetailScreen;
