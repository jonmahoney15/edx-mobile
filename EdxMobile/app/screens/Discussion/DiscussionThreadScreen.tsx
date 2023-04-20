import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { AppStackScreenProps } from "../../navigators"
import { StatusBar,SafeAreaView, ImageBackground, Button,View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Platform } from 'react-native'
import { FontAwesome,EvilIcons,AntDesign, Feather} from '@expo/vector-icons'

function FetchDiscussionThreadFromApi(threadId){
    const discussion = {
        thread_id: 213123,
        title: "Got feedback or questions about this Demo course?",
        body: "Hi All,"+
              "\n\nThis course is a sandbox area to explore and get familiar with the Open edX platform. If you have technical issues that need an urgent response, please contact edX Learner Support directly."+
              "\n\nIf you have general feedback you'd like to share with the DemoX course team, please share that here. If you'd prefer to remain anonymous, check the post anonymously button."+
              "\n\nDue to the large enrollment size in DemoX, we might not be able to respond to every comment. If you have a question, please create a Question post and we will try to respond as soon as possible."+
              "\n\nI hope you enjoy exploring DemoX!"+
              "Ben @ edX",
        author: "BenPiscopo",
        date: "3y",
        likes: "104",
        comments:[
        {
            author: "sdfgardiner ",
            body: "Hi Ben,\n"+
                   "Everything is great. The only issue is I got all the way to the end of the course, but it keeps saying I am only at 91%. ",
            date: "1w"
        },
        {
            author: "Endale2030 ",
            body: "So far so good no problems",
            date: "4w"
        },
        {
            author: "natasha_943 ",
            body: "Hi Ben... I am just familiarizing myself with the Demo course and was completely flummoxed by the previous homework question "+
            "in which country is the edX office located?",
            date: "8w"
        },
        ]
    }
    return discussion;
}

const data = FetchDiscussionThreadFromApi("dummy-thread-id")

interface DiscussionThreadScreenProps extends AppStackScreenProps<"DiscussionThread"> {}

export const DiscussionThreadScreen: FC<DiscussionThreadScreenProps> = observer(function DiscussionThreadScreen(
  _props
) {
  const { navigation } = _props
  const { route } = _props
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
                    <Text numberOfLines={1} style={styles.title}>Replies</Text>
                </View>
                <Feather name="user" color='#fff' size={24} onPress={() => handleProfilePress()}/>
            </View>
          <View style={styles.screenBody}>
            <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <EvilIcons name="user" size={36} color="white" />
                    <View style={styles.titleRow}>
                        <Text style={styles.postTitle}>{data.title}</Text>
                        <Text style={styles.postAuthor}>{data.author}</Text>
                    </View>
                </View>
                <View style={styles.postBody}>
                    <Text style={styles.postBodyText}>{data.body}</Text>
                </View>
                <View style={styles.counterRow}>
                    <AntDesign name="like1" size={16} color="white" />
                    <Text style={styles.postCounter}>{data.likes}</Text>
                </View>
            </View>
            <FlatList
              data={data.comments}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.commentContainer}
                  onPress={() => handlePostPress(item)}>
                  <View style={styles.postHeader}>
                      <EvilIcons name="user" size={36} color="white" />
                      <View style={styles.titleRow}>
                          <Text style={styles.commentAuthorText}>{item.author}</Text>
                          <Text style={styles.commentDateText}>{item.date}</Text>
                      </View>
                  </View>
                  <View style={styles.commentBody}>
                      <Text style={styles.postBodyText}>{item.body}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add a response</Text>
              </View>
            </TouchableOpacity>
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
  image: {
      flex: 1,
      justifyContent: 'flex-start',
      height: '100%',
  },
  postContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor : '#282424EE',
    borderRadius: 12,
    margin: 12,
    padding: 10,
  },
  postHeader: {
    flexDirection : 'row',
    width: '100%',
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
  postBody: {
    width:'100%',
    minHeight: 100,
    flexDirection: 'row',
    color: '#fff',
    margin: 10,
  },
  postBodyText: {
    color: '#fff',
    fontSize: 12,
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
  commentContainer:{
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    borderBottomColor: '#fffa',
    borderBottomWidth: 1,
  },
  commentHeader:{
    width:'100%',
    flexDirection: 'row',
  },
  commentAuthorText: {
    color: '#C8815D',
  },
  commentDateText: {
    color: '#fff',
    fontSize: 11,
  },
  commentBody: {
    width:'100%',
    flexDirection: 'row',
    color: '#fff',
    margin: 10,
  },
  commentBodyText: {
    color: '#fff',
    fontSize: 12,
  },
  postCounter: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '400',
    marginRight: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:  {
    backgroundColor: '#FFB267',
    borderRadius: 100,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    fontStyle: 'normal',
    fontSize: 15,
    textAlign: 'center',
  },
});