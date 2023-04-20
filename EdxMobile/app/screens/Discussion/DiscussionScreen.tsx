import React, { FC } from "react"
import { StatusBar, SafeAreaView, ImageBackground, View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import { AppStackScreenProps } from "../../navigators"
import { observer } from "mobx-react-lite"
import { FontAwesome, EvilIcons, AntDesign, Feather } from '@expo/vector-icons'

function FetchDiscussionListFromApi(course_id){   //sample function should be replaced with code to interact with API
    const discussions = [     //dummy discussions
    {
      'id': 0,
      'course_id':4255135,
      'title' : 'Got feedback or questions about this Demo course?',
      'author' : 'BenPiscopo',
      'likes_count' : 104,
      'comments_count' : 419
    },
    {
      'id': 1,
      'course_id':4255135,
      'title' : 'Hello from CR Hello my name is Carolina Pacheco, I ...',
      'author' : 'cpacheco0109',
      'likes_count' : 20,
      'comments_count' : 2
    },
    {
      'id': 2,
      'course_id':4255135,
      'title' : 'Hello and greetings from Texas Hi, my name is Carl ...',
      'author' : 'Cavinaru',
      'likes_count' : 0,
      'comments_count' : 1
    },
    {
      'id': 3,
      'course_id':4255135,
      'title' : 'Got feedback or questions about this Demo course?',
      'author' : 'BenPiscopo',
      'likes_count' : 104,
      'comments_count' : 419
    },
    {
      'id': 4,
      'course_id':4255135,
      'title' : 'Hello from CR Hello my name is Carolina Pacheco, I ...',
      'author' : 'cpacheco0109',
      'likes_count' : 20,
      'comments_count' : 2
    },
    {
      'id': 5,
      'course_id':4255135,
      'title' : 'Hello and greetings from Texas Hi, my name is Carl ...',
      'author' : 'Cavinaru',
      'likes_count' : 0,
      'comments_count' : 1
    },
    {
      'id': 6,
      'course_id': 4255135,
      'title' : 'Got feedback or questions about this Demo course?',
      'author' : 'BenPiscopo',
      'likes_count' : 104,
      'comments_count' : 419
    },
    {
      'id': 7,
      'course_id': 4255135,
      'title' : 'Hello from CR Hello my name is Carolina Pacheco, I ...',
      'author' : 'cpacheco0109',
      'likes_count' : 20,
      'comments_count' : 2
    },
    {
      'id': 8,
      'course_id':4255135,
      'title' : 'Hello and greetings from Texas Hi, my name is Carl ...',
      'author' : 'Cavinaru',
      'likes_count' : 0,
      'comments_count' : 1
    }]

    //const discussion = discussions.filter(discuss => discuss.id == course_id);
    return discussions;
}

interface DiscussionScreenProps extends AppStackScreenProps<"Discussion"> {}

export const DiscussionScreen: FC<DiscussionScreenProps> = observer(function DiscussionScreen(
  _props
) {
  const { navigation } = _props
  const { route } = _props
  const { id } = route.params;
  const imagePath = require('../../../assets/images/word-cloud.jpeg');

  const handlePostPress = (module) => {
    navigation.navigate('DiscussionThread');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.blackBackground}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="angle-left" color='#fff' size={24} onPress={() => navigation.goBack()}/>
                <View style={styles.titleArea}>
                <Text numberOfLines={1} style={styles.title}>Discussions</Text>
                </View>
                <Feather name="user" color='#fff' size={24} onPress={() => handleProfilePress()}/>
            </View>
          <View>
            <FlatList
              data={FetchDiscussionListFromApi("course-13434x")}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.postContainer}
                  onPress={() => handlePostPress(item)}
                >
                  <EvilIcons name="user" size={36} color="white" />
                  <View style={styles.titleRow}>
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <Text style={styles.postAuthor}>{item.author}</Text>
                    <View style={styles.counterRow}>
                            <AntDesign name="like1" size={16} color="white" />
                            <Text style={styles.postCounter}>{item.likes_count}</Text>
                            <FontAwesome name="comments" size={16} color="white" />
                            <Text style={styles.postCounter}> {item.comments_count}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            </View>
        </SafeAreaView>
        </ImageBackground>
    </View>
  );
});

const backgroundImage = require('../../../assets/images/futuristic-background.png');

const styles = StyleSheet.create({
  header: {
      display: 'flex',
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      marginTop: 12,
    },
  blackBackground: {
      flex: 1,
      backgroundColor: '#000c',
    },
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingBottom: 40,
      backgroundColor: '#000c',
    },
  titleArea: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 16,
      overflow: 'hidden',
    },
    title: {
      fontSize: 16,
      fontWeight: 'normal',
      color: 'white',
      textAlignVertical: 'center',
      width: 'auto',
    },
    background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    width: '100%',
    height: '100%',
  },
  titleRow:{
    width: '100%'
  },
  image: {
      flex: 1,
      justifyContent: 'flex-start',
      height: '100%',
    },
    postContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor : '#fff0',
        borderRadius: 8,
        borderBottomColor: '#fffa',
        margin: 4,
        borderBottomWidth: 1,
  },
  postTitle: {
    width: '100%',
    height: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.01,
    color: '#FFF',
    order: 0,
  },
  postAuthor: {
    width: '100%',
    height: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.01,
    color: '#FFF',
    order: 0,
  },
  counterRow: {
        height: 18,
  flexDirection: 'row',
    width: '100%',
  },
  postLikes:{
    backgroundColor: '#fff',
    flex: 0,
  },
  postComments:{
       backgroundColor: '#fff',
 flex: 0,
  },
  postCounter: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '400',
    marginRight: 10,
  },
});

export default DiscussionScreen;
