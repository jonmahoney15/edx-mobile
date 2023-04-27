import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { AppStackScreenProps } from "../../navigators"
import { StatusBar,SafeAreaView, TextInput, ImageBackground, Button,View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Platform } from 'react-native'
import { FontAwesome,EvilIcons,AntDesign, Feather} from '@expo/vector-icons'
import { api } from "../../services/api"
import { useStores } from "../../models"
import HTML from 'react-native-render-html'

interface DiscussionComment {
  id: string,
  full_body: string,
  author: string,
  date: string,
}

interface DiscussionThreadScreenProps extends AppStackScreenProps<"DiscussionThread"> {}

export const DiscussionThreadScreen: FC<DiscussionThreadScreenProps> = observer(function DiscussionThreadScreen(
  _props
) {
  const { navigation } = _props
  const { route } = _props
  const { thread } = _props.route.params

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const {
    authenticationStore: {
      authToken
    }
  } = useStores();

  const TextEntry = ({ onCancel, onSubmit }) => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');

    const handleSubmit = () => {
      const commentData = {
        comment: {
          parent_id: null,
          thread_id: 'thread.id',
          raw_body: 'new comment',
        }
      };

      api.post(`/api/discussion/v1/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        validateStatus: function (status: number) {
          return status < 500;
        },
        body: JSON.stringify(commentData)
      }
     )
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error));

      setText('');
    };

    const postNewComment = async (data) => {


    };

    const handleCancel = () => {
      setText('');
      setVisible(false);
    };

    const handleNewResponseButtonPress = () => {
      setVisible(!visible);
    };

    return (
      <View>
          {visible ?
          <View style={styles.textBoxContainer}>
            <TextInput
              style={styles.textBox}
              value={text}
              onChangeText={setText}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </View>
            <Text style={{color:'red'}} onPress={handleCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity style={styles.buttonContainer} onPress={handleNewResponseButtonPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Add a response</Text>
            </View>
          </TouchableOpacity>
          }
      </View>
    );
  };    //TextEntry

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
      await api.get(thread.comment_list_url,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          validateStatus: function (status: number) {
            return status < 500;
          }
        }
      ).then(async response => {
          let comments: DiscussionComment[] = [];
          if (response.status === 200) {
            const { data } = response;

            const results: any[] = Object.values(data.results)

            results.forEach(item => {
              let comment: DiscussionComment = {
                id: item.id,
                full_body: item.rendered_body,
                author: item.author,
                date: item.created_at,
              }
              comments.push(comment)
            })

           setComments(comments);

          }
        })
        .catch((e) => {
          console.log('Error In Comments Load:');
          const error = Object.assign(e);
          console.log(error);
        }
      );
  }


  useEffect(() => {
      fetchComments();
  }, [])

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
                        <Text style={styles.postTitle}>{thread.title}</Text>
                        <Text style={styles.postAuthor}>{thread.author}</Text>
                    </View>
                </View>
                <View style={styles.postBody}>
                    <Text style={styles.postBodyText}>{thread.full_body}</Text>
                </View>
                <View style={styles.counterRow}>
                    <AntDesign name="like1" size={16} color="white" />
                    <Text style={styles.postCounter}>{thread.vote_count}</Text>
                </View>
            </View>
            <FlatList
              data={comments}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.commentContainer}>
                  <View style={styles.postHeader}>
                      <EvilIcons name="user" size={36} color="white" />
                      <View style={styles.titleRow}>
                          <Text style={styles.commentAuthorText}>{item.author}</Text>
                          <Text style={styles.commentDateText}>{item.date}</Text>
                      </View>
                  </View>
                  <View style={styles.commentBody}>
                      <Text style={styles.postBodyText}>{item.full_body}</Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.list}
              ListFooterComponent = {TextEntry}
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
  image: {
      flex: 1,
      justifyContent: 'flex-start',
      height: '100%',
  },
  postContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor : '#333333aa',
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
  textBoxContainer: {
    margin: 20,
  },
  textBox: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  list:{
    width: '100%',
    marginTop: 40,
  },
  screenBody:{
    flex: 1,
  }
});