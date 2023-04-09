import React, { FC } from "react"
import { StatusBar, ImageBackground, View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"
import {Card, Button, Header} from "react-native-elements"
import { FontAwesome,EvilIcons,AntDesign, Feather} from '@expo/vector-icons'


function FetchDiscussionFromApi(course_id){   //sample function should be replaced with code to interact with API
    discussions = [     //dummy discussions
    {'id':4255135,
    'title' : 'Got feedback or questions about this Demo course?',
    'author' : 'BenPiscopo',
    'likes_count' : 104,
    'comments_count' : 419
    },
    {'id':4255135,
    'title' : 'Hello from CR Hello my name is Carolina Pacheco, I ...',
    'author' : 'cpacheco0109',
    'likes_count' : 20,
    'comments_count' : 2
    },
    {'id':4255135,
    'title' : 'Hello and greetings from Texas Hi, my name is Carl ...',
    'author' : 'Cavinaru',
    'likes_count' : 0,
    'comments_count' : 1
    },
    {'id':4255135,
    'title' : 'Got feedback or questions about this Demo course?',
    'author' : 'BenPiscopo',
    'likes_count' : 104,
    'comments_count' : 419
    },
    {'id':4255135,
    'title' : 'Hello from CR Hello my name is Carolina Pacheco, I ...',
    'author' : 'cpacheco0109',
    'likes_count' : 20,
    'comments_count' : 2
    },
    {'id':4255135,
    'title' : 'Hello and greetings from Texas Hi, my name is Carl ...',
    'author' : 'Cavinaru',
    'likes_count' : 0,
    'comments_count' : 1
    },
    {'id':4255135,
    'title' : 'Got feedback or questions about this Demo course?',
    'author' : 'BenPiscopo',
    'likes_count' : 104,
    'comments_count' : 419
    },
    {'id':4255135,
    'title' : 'Hello from CR Hello my name is Carolina Pacheco, I ...',
    'author' : 'cpacheco0109',
    'likes_count' : 20,
    'comments_count' : 2
    },
    {'id':4255135,
    'title' : 'Hello and greetings from Texas Hi, my name is Carl ...',
    'author' : 'Cavinaru',
    'likes_count' : 0,
    'comments_count' : 1
    }]
    return discussions;
}

interface DiscussionScreenProps extends AppStackScreenProps<"Welcome"> { }

export const DiscussionScreen: FC<DiscussionScreenProps> = observer(function DiscussionScreen(
  _props
) {
  const { navigation } = _props
  const { route } = _props
  const course_id = _props.route.params.course_id;
  const { title, description, image, modules } = FetchDiscussionFromApi(course_id);
  const imagePath = require('../../assets/images/word-cloud.jpeg');

  const handlePostPress = (module) => {

  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
    <Header
        placement="left"
        leftComponent={<Feather name="chevron-left" color='#fff' size={24} onPress={() => navigation.goBack()}/>}
        centerComponent={{ text: "Discussions", style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<Feather name="user" size={24} color="white" onPress={() => handleProfilePress()}/>}
        containerStyle={{
          justifyContent: 'space-around',
          backgroundColor: 'black'
        }}
    />
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.backgroundTransparency}>
            <FlatList
              data={FetchDiscussionFromApi("course-13434x")}        //dummy course id
              keyExtractor={(item) => item.id}
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
      </ImageBackground>
    </View>
  );
});

const backgroundImage = require('../../assets/images/futuristic-background.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundTransparency: {
    flex: 1,
    backgroundColor: '#000c',
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
    height: 200,
    width: '100%',
    resizeMode: 'cover',
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

    fontFamily: 'Manrope',
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

    fontFamily: 'Manrope',
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
