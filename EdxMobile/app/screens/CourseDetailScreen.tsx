import React, { FC } from "react"
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"

interface Module {
  id: string;
  title: string;
  duration: string;
}

const modules: Module[] = [
  {
    id: '1',
    title: 'Getting Started',
    duration: '1h 30m',
  },
  {
    id: '2',
    title: 'Building UI with Components',
    duration: '2h 15m',
  },
  {
    id: '3',
    title: 'Navigating Between Screens',
    duration: '1h 45m',
  },
  {
    id: '4',
    title: 'Managing State with Redux',
    duration: '2h 30m',
  },
];

interface CourseDetailParams {
  title: string;
  description: string;
  image: string;
}

interface CourseDetailScreenProps extends AppStackScreenProps<"Welcome"> { }

export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function CourseDetailScreen(
  _props
) {
  const { route } = _props
  const { title, description, image } = _props.route.params as CourseDetailParams;
  const imagePath = require('../../assets/images/word-cloud.jpeg');

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
            <View style={styles.moduleContainer}>
              <Text style={styles.moduleTitle}>{item.title}</Text>
              <Text style={styles.moduleDuration}>{item.duration}</Text>
            </View>
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
