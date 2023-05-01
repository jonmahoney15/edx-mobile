import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { AppStackScreenProps } from "../../navigators"
import { StatusBar, SafeAreaView, TextInput, ImageBackground, Image, View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, useWindowDimensions, ScrollView } from 'react-native'
import { EvilIcons, AntDesign} from '@expo/vector-icons'
import { api } from "../../services/api"
import { useStores } from "../../models"
import { PrettyHeader } from "../../components/PrettyHeader"
import RenderHtml from 'react-native-render-html';
import { typography } from "../../theme/typography"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "../../theme/colors"
import { TextEntry } from "./TextEntry"
import { LoadingIcon } from "../../components"


interface DiscussionComment {
  id: string,
  full_body: string,
  author: string,
  date: string,
  icon: string,
}

interface DiscussionThreadParams {
  thread_id: string
  thread_title: string
  thread_full_body: string,
  thread_author: string,
  thread_vote_count: number,
  thread_comment_list_url: string,
  thread_icon: string
}

const tagsStyles = {
  body: {
    color: 'white'
  },
  a: {
    color: 'green'
  },
  p: {
    fontSize: 12,
    color: 'white',
    fontFamily: typography.primary.medium
  }
}

interface DiscussionThreadScreenProps extends AppStackScreenProps<"DiscussionThread"> {}

export const DiscussionThreadScreen: FC<DiscussionThreadScreenProps> = observer(function DiscussionThreadScreen(
  _props
) {
  const { navigation } = _props
  const { route } = _props
  const { thread_id, thread_title, thread_full_body, thread_author, thread_vote_count, thread_comment_list_url, thread_icon } = _props.route.params as DiscussionThreadParams

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const {
    authenticationStore: {
      authToken
    }
  } = useStores();  

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProfilePicture = async (username) => {
    let profilePicture = "";
    await api.get(`/api/user/v1/accounts/${encodeURIComponent(username)}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        validateStatus: function (status: number) {
          return status < 500;
        }
      }
    ).then(response => {
      if (response.status === 200) {
        const { data } = response
        if (data.profile_image.has_image) {
          profilePicture = data.profile_image.image_url_small;
        }
      }
    })
      .catch((e) => {
        console.log('Error In Post Author Icon Load:');
        const error = Object.assign(e);
        console.log(error);
      });
    return profilePicture;
  }

  const fetchComments = async () => {
    let comments: DiscussionComment[] = [];
    let page = 1
    let hasMorePages = true

    while (hasMorePages) {
      await api.get(`${thread_comment_list_url}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          validateStatus: function (status: number) {
            return status < 500;
          }
        }
      ).then(async response => {
          
          if (response.status === 200) {
            const { data } = response;
            

            const results: any[] = Object.values(data.results)

            results.forEach(item => {
              let comment: DiscussionComment = {
                id: item.id,
                full_body: item.rendered_body,
                author: item.author,
                date: item.created_at,
                icon: '',
              }
              comments.push(comment)
            })

            // append pfp url to thread object if the author has a custom pfp
            await Promise.all(
              comments.map(async (comment) => {
                const profilePictureUrl = await fetchProfilePicture(comment.author)
                if (profilePictureUrl) {
                  comment.icon = profilePictureUrl
                } else {
                  comment.icon = ''
                }
                return comment
              })
            )
            
            const pagination: any = Object(data.pagination)
            if (pagination.next === null){
              hasMorePages = false
            } else {
              page++
            }
          }
        })
        .catch((e) => {
          console.log('Error In Comments Load:');
          const error = Object.assign(e);
          console.log(error);
          setIsLoading(false);
        }
      );
    }
    setIsLoading(false);
    setComments(comments);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchComments();
  }, [])


  const { width } = useWindowDimensions();
  return (
    <View style={styles.blackBackground}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <SafeAreaView style={styles.container}>
          <PrettyHeader title={thread_title} theme="grey" onLeftPress={() => navigation.goBack()} onRightPress={handleProfilePress}/>
          <LoadingIcon isLoading={isLoading}>
            <View style={styles.screenBody}>
              <View style={{height: 'auto'}}>
                <ScrollView fadingEdgeLength={100}>
                  <View style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        {thread_icon ? <Image defaultSource={iconPlaceholder} source={{ uri: thread_icon }} style={styles.pfp} /> : <EvilIcons name="user" size={46} color="white" style={styles.pfp_placeholder} />}
                        <View style={{}}>
                            <Text style={styles.postTitle}>{thread_title}</Text>
                            <Text style={styles.postAuthor}>{thread_author}</Text>
                        </View>
                    </View>
                    <View style={styles.postBody}>
                      <RenderHtml contentWidth={width} source={{html: thread_full_body}} tagsStyles={tagsStyles}/>
                    </View>
                    <View style={styles.counterRow}>
                      <AntDesign name="like1" size={16} color="white" />
                      <Text style={styles.postCounter}> {thread_vote_count}</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <FlatList
                data={comments}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.commentContainer}>
                    <View style={styles.postHeader}>
                        {item.icon ? <Image defaultSource={iconPlaceholder} source={{ uri: item.icon }} style={styles.reply_pfp} /> : <EvilIcons name="user" size={36} color="white" style={styles.reply_pfp_placeholder} />}
                        <View style={{}}>
                            <Text style={styles.commentAuthorText}>{item.author}</Text>
                            <Text style={styles.commentDateText}>{item.date}</Text>
                        </View>
                    </View>
                    <View style={styles.commentBody}
                      <RenderHtml contentWidth={width} source={{html: item.full_body}} tagsStyles={tagsStyles}/>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.list}
                ListFooterComponent = {<TextEntry thread_id={thread_id} fetchComments={fetchComments}/>}
              />
            </View>
          </LoadingIcon>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});

const backgroundImage = require('../../../assets/images/futuristic-background.png');
const iconPlaceholder = require('../../../assets/icons/pfp-placeholder.png');

const styles = StyleSheet.create({
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
  pfp: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
  },
  pfp_placeholder: {
    marginLeft: -10,
    marginRight: 5,
  },
  reply_pfp: {
    width: 26,
    height: 26,
    marginRight: 6,
    borderRadius: 100,
  },
  reply_pfp_placeholder: {
    marginLeft: -6,
  },
  postContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.translucentBackground,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
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
  },
  postBodyText: {
    color: '#fff',
    fontSize: 12,
  },
  counterRow: {
    height: 18,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'baseline',
  },
  postLikes:{
    backgroundColor: '#fff',
    flex: 0,
  },
  commentContainer:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#fffa',
    borderBottomWidth: 1.5,
    marginBottom: 12
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
    marginTop: -6,
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
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
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
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  list:{
    borderTopColor: '#fffa',
    borderTopWidth: 1.5,
    width: '100%',
    paddingTop: 16,
  },
  screenBody:{
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
  }
});