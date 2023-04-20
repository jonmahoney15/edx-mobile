import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React, { FC, useEffect, useState } from "react";
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { PrettyHeader } from "../components/PrettyHeader"
import { Animated } from 'react-native';
import { api } from '../services/api'
import { useStores } from "../models"
import { normalizeOutlineBlocks } from '../utils/formatData';

const hardCodedCourse =
    [
      {
        id: '1',
        display_name: 'Getting Started',
        duration: '1h 30m',
        videoId: '6oFuwhIibo4',
        bodyText: 'In this module, you will learn the fundamentals of React Native, including how to set up your development environment and create your first mobile app. You will explore the basic syntax and structure of React Native components and learn how to use them to build simple user interfaces. By the end of this module, you will have a solid foundation in React Native and be ready to move on to more advanced topics.',
        submodules: []
      },
      {
        id: '2',
        display_name: 'Building UI with Components',
        duration: '2h 15m',
        videoId: 'eAXow8r3lYY',
        bodyText: 'In this module, you will dive deeper into React Native components and learn how to use them to create complex and beautiful user interfaces. you will explore various built-in components like text, images, buttons, and inputs, and learn how to style them using CSS-like syntax. you will also learn how to create custom components by composing multiple existing components. By the end of this module, you will have the skills to build a variety of user interfaces for your mobile app.',
        submodules: []
      },
      {
        id: '3',
        display_name: 'Navigating Between Screens',
        duration: '1h 45m',
        videoId: 'OmQCU-3KPms',
        bodyText: 'In this module, you will learn how to create multi-screen mobile apps using React Navigation, a popular library for navigation in React Native. you will explore various navigation patterns like stack navigation, tab navigation, and drawer navigation, and learn how to implement them using React Navigation. you will also learn how to pass data between screens and handle navigation events like back button presses. By the end of this module, you will be able to create sophisticated navigation flows for your mobile app.',
        submodules: []
      },
      {
        id: '4',
        display_name: 'Managing State with Redux',
        duration: '2h 30m',
        videoId: 'BtJoy4G3N8U',
        bodyText: 'In this module, you will learn how to manage the state of your React Native app using Redux, a popular library for state management in React. you will explore the basic concepts of Redux like store, actions, and reducers, and learn how to use them to manage complex state in your app. you will also learn how to integrate Redux with React Native components using the React-Redux library. By the end of this module, you will have the skills to manage the state of your mobile app in a scalable and maintainable way.',
        submodules: []
      },
    ];

interface ICourseDetailsParams {
  id: string;
  title: string;
}

const backgroundImage = require("../../assets/images/futuristic_library_technology.png")

interface CourseDetailScreenProps extends AppStackScreenProps<"CourseDetail"> { }

export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function CourseDetailScreen(
  _props
) {
  const { navigation } = _props
  const { id, title }  = _props.route.params as ICourseDetailsParams;
  const [course, setCourse] = useState([]);
  const [checkedModules, setCheckedModules] = useState<string[]>([]);

  const {
    authenticationStore: { authToken },
  } = useStores()

  const [checkedSubModules, setCheckedSubModules] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const FetchCourseDetailFromApi = async () => {
    await api.get(`/api/course_home/outline/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          validateStatus: function (status) {
            return status < 500;
          }
        }
      ).then(response => {
        let modules = hardCodedCourse
        if (response.status === 200) {
          const { data } = response;
          
          if (data.course_blocks) {
            //@ts-ignore
            modules = Object.values(data.course_blocks.blocks).filter(item => item.type === "chapter");
            const courseBlocks = normalizeOutlineBlocks(id, data.course_blocks.blocks);
            
            modules.forEach(module => {
              //@ts-ignore
              module.submodules = Object.values(courseBlocks.sequences).filter(sequence => sequence.sectionId === module.id);
            }) 
          }
        }

        setCourse(modules)
      })
      .catch((e) => {
        console.log('Error In Course Blocks Load:');
        const error = Object.assign(e);
        console.log(error);
        setCourse(hardCodedCourse);
      }
    );
  }

  const handleModulePress = (module) => {
    if (course.length > 0) {
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
    navigation.navigate('Module', {
      id: submodule.id,
      title: submodule.title,
      duration: submodule.duration,
      videoId: submodule.videoId,
      bodyText: submodule.bodyText,
    });
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
      <View style={{marginTop: 50}}>
        <PrettyHeader
          title={title}
          theme='black'
          onLeftPress={navigation.goBack}
          onRightPress={handleProfilePress}
        />
      </View>
      <View style={styles.beginContainer}>
        <Text style={styles.beginCourse}>Begin Your course today</Text>
        <TouchableOpacity onPress={() => handleModulePress(course[0])}>
          <View style={styles.startContainer}>
            <Text style={styles.viewCourse}>Start Course</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.textContainer}>
          <FlatList
            data={course}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.moduleContainer, { flexDirection: 'column' }]}
                onPress={() => handleModulePress(item)}
              >
                <View style={styles.component1}>
                  <TouchableOpacity onPress={() => toggleModuleChecked(item.id)}>
                    <MaterialCommunityIcons name={checkedModules.includes(item.id) ? "check-circle" : "circle"} size={20} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.title}>{item.display_name}</Text>
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
                            <TouchableOpacity onPress={() => toggleSubModuleChecked(submodule.id)}>
                              <MaterialCommunityIcons name={checkedSubModules.includes(submodule.id) ? "check-circle" : "circle"} size={20} color="#fff" />
                            </TouchableOpacity>
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
    margin: 50,
    width: "75%",
    height: "10%",
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
