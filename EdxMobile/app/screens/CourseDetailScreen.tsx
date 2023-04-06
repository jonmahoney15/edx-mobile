import React, { FC } from "react"
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"
import {Card, Button, Header} from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons'

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

  const handleModulePress = (module) => {
    navigation.navigate('Module', {
      id: module.id,
      title: module.title,
      duration: module.duration,
      videoId: module.videoId,
      bodyText: module.bodyText,
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
    <Header
            placement="left"
            leftComponent={<FontAwesome name="arrow-left" color='#fff' size={24} onPress={() => navigation.goBack()}/>}
            centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
            rightComponent={<FontAwesome name="user" size={32} color="#fff" onPress={() => handleProfilePress()}/>}
            containerStyle={{
              justifyContent: 'space-around',
            }}
          />
      <Image source={imagePath} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={{ height: 20 }} />
        <Text style={styles.modulesTitle}>Modules</Text>
        <FlatList
          data={modules}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.moduleContainer}
              onPress={() => handleModulePress(item)}
            >
              <Text style={styles.moduleTitle}>{item.title}</Text>
              <Text style={styles.moduleDuration}>{item.duration}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
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
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleDuration: {
    fontSize: 16,
  },
});

export default CourseDetailScreen;
