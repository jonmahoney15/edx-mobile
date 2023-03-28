import React, { FC } from "react"
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"

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

interface CourseDetailScreenProps extends AppStackScreenProps<"Welcome"> { }

export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function CourseDetailScreen(
  _props
) {
  const { navigation } = _props
  const { route } = _props
  const { title, description, image, modules } = _props.route.params as CourseDetailParams;
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

  return (
    <View style={styles.container}>
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
