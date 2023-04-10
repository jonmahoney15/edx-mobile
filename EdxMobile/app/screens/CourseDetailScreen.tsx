import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import {Card, Button, Header} from "react-native-elements"

interface Module {
  id: string;
  title: string;
  duration: string;
  videoId: string;
  bodyText: string;
}

interface CourseDetailParams {
  title: string;
  description: string;
  image: string;
  modules: Module[];
}

function FetchCourseDetailFromApi(course_id){   //sample function should be replaced with code to interact with API
    course = {              //sample course detail
        title: 'Introduction to React Native',
        image: require("../../assets/images/word-cloud.jpeg"),
        description: 'Learn the basics of building mobile apps with React Native.',
        modules: [
              {
                id: '1',
                title: 'Getting Started',
                duration: '1h 30m',
                videoId: '6oFuwhIibo4',
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                id: '2',
                title: 'Building UI with Components',
                duration: '2h 15m',
                videoId: '6oFuwhIibo4',
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                id: '3',
                title: 'Navigating Between Screens',
                duration: '1h 45m',
                videoId: '6oFuwhIibo4',
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                id: '4',
                title: 'Managing State with Redux',
                duration: '2h 30m',
                videoId: '6oFuwhIibo4',
                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
            ]
    }
    return course
}

interface CourseDetailScreenProps extends AppStackScreenProps<"Welcome"> { }

export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function CourseDetailScreen(
  _props
) {
  const { navigation } = _props
  const { route } = _props
  const course_id = _props.route.params.course_id;
  const { title, description, image, modules } = FetchCourseDetailFromApi(course_id);
  const imagePath = require('../../assets/images/word-cloud.jpeg');
  const [checkedModules, setCheckedModules] = useState<string[]>([]);

  const handleModulePress = (module) => {
    navigation.navigate('Module', {
      id: module.id,
      title: module.title,
      duration: module.duration,
      videoId: module.videoId,
      bodyText: module.bodyText,
    });
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
    <ImageBackground source={require('../../assets/images/background_image.png')} style={styles.container}>
      <Header
          placement="left"
          leftComponent={<FontAwesome name="arrow-left" color='#fff' size={24} onPress={() => navigation.goBack()}/>}
          centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
          rightComponent={<FontAwesome name="user" size={32} color="#fff" onPress={() => handleProfilePress()}/>}
          containerStyle={{
            justifyContent: 'space-around',
          }}
      />
      <Image source={imagePath} style={styles.image} />Ï
      <View style={[styles.card1, { flex: 1 }]}>
        <View style={styles.rectangle24}>
          <Text style={styles.beginCourse}>Begin Your course today</Text>
          <TouchableOpacity>
            <View style={styles.rectangle25}>
              <Text style={styles.viewCourse}>Start Course</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <View style={[styles.textContainer, { paddingVertical: 20 }]}>
          {/* <Text style={styles.title}>{title}</Text> */}
          <FlatList
            data={modules}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.moduleContainer}
                onPress={() => handleModulePress(item)}
              >
                <View style={styles.component1}>
                  <View style={styles.rectangle23}></View>
                  {checkedModules.includes(item.id) && (
                    <TouchableOpacity onPress={() => toggleModuleChecked(item.id)}>
                      <MaterialCommunityIcons name="check-circle" size={20} color="#000" style={styles.checkmark} />
                    </TouchableOpacity>
                  )}
                  {!checkedModules.includes(item.id) && (
                    <TouchableOpacity onPress={() => toggleModuleChecked(item.id)}>
                      <MaterialCommunityIcons name="circle" size={20} color="#000" style={styles.checkmark} />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.introduction}>{item.title}</Text>
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
  rectangle23: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(133, 213, 190, 0.71)',
    borderRadius: 24,
  },
  introduction: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    color: '#000000',
    marginLeft: 15
  },
  checkmark: {
    left: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    resizeMode: 'cover',
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 100,
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modulesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  moduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 0,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleDuration: {
    fontSize: 16,
  },
  card1: {
    position: 'relative',
    top: 200,
    marginLeft: 20
  },
  rectangle24: {
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
  rectangle25: {
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
