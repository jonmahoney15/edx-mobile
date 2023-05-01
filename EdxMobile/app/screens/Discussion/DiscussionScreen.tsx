import React, { FC, useEffect, useState } from "react"
import { StatusBar, SafeAreaView, ImageBackground, View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Platform } from 'react-native'
import { AppStackScreenProps } from "../../navigators"
import { observer } from "mobx-react-lite"
import { PrettyHeader } from "../../components/PrettyHeader"
import { FontAwesome, AntDesign, EvilIcons } from '@expo/vector-icons'
import { colors } from "../../theme"
import { useStores } from "../../models"
import { api } from "../../services/api"
import { LoadingIcon } from "../../components/LoadingIcon"

interface DiscussionPost {
  id: string,
  title: string,
  preview_body: string,
  full_body: string,
  author: string,
  vote_count: number,
  comment_count: number,
  comment_list_url: string,
  icon: string
}

const hardCodedDiscussions: DiscussionPost[] = [     //dummy discussions
  {
    id: '0',
    title: 'Got feedback or questions about this Demo course?',
    preview_body: 'Hi All, This course is a sandbox area to explore and',
    author: 'BenPiscopo',
    vote_count: 104,
    comment_count: 419,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '1',
    title: 'Hello from CR',
    preview_body: 'Hello my name is Carolina Pacheco, I',
    author: 'cpacheco0109',
    vote_count: 20,
    comment_count: 2,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '2',
    title: 'Hello and greetings from Texas',
    preview_body: 'Hi, my name is Carl. I\'m from Texas and',
    author: 'Cavinaru',
    vote_count: 0,
    comment_count: 1,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '3',
    title: 'Got feedback or questions about this Demo course?',
    preview_body: 'Hello my name is Carolina Pacheco, I',
    author: 'BenPiscopo',
    vote_count: 104,
    comment_count: 419,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '4',
    title: 'Got feedback or questions about this Demo course?',
    preview_body: 'Hi All, This course is a sandbox area to explore and',
    author: 'BenPiscopo',
    vote_count: 104,
    comment_count: 419,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '5',
    title: 'Hello from CR',
    preview_body: 'Hello my name is Carolina Pacheco, I',
    author: 'cpacheco0109',
    vote_count: 20,
    comment_count: 2,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '6',
    title: 'Hello and greetings from Texas',
    preview_body: 'Hi, my name is Carl. I\'m from Texas and',
    author: 'Cavinaru',
    vote_count: 0,
    comment_count: 1,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '7',
    title: 'Got feedback or questions about this Demo course?',
    preview_body: 'Hello my name is Carolina Pacheco, I',
    author: 'BenPiscopo',
    vote_count: 104,
    comment_count: 419,
    full_body: '',
    comment_list_url: '',
    icon: '',
  },
  {
    id: '8',
    title: 'Got feedback or questions about this Demo course?',
    preview_body: 'Hi All, This course is a sandbox area to explore and',
    author: 'BenPiscopo',
    vote_count: 104,
    comment_count: 419,
    full_body: '',
    comment_list_url: '',
    icon: '',
  }
]

interface DiscussionScreenProps extends AppStackScreenProps<"Discussion"> { }

export const DiscussionScreen: FC<DiscussionScreenProps> = observer(function DiscussionScreen(
  _props
) {
  const { navigation } = _props

  const { id } = _props.route.params
 
  const handlePostPress = (thread) => {
    navigation.push('DiscussionThread', {
      id: id,
      thread_id: thread.id, 
      thread_title: thread.title, 
      thread_full_body: thread.full_body, 
      thread_author: thread.author, 
      thread_vote_count: thread.vote_count, 
      thread_comment_list_url: thread.comment_list_url, 
      thread_icon: thread.icon
    });
   
  };

  const handleCreateDiscussionPress = () => {
    navigation.navigate('CreateDiscussion', {
      id: id,
      update: fetchDiscussions
    })
  }

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const {
    authenticationStore: {
      authToken
    }
  } = useStores();

  const [isLoading, setIsLoading] = useState(true);
  const [discussions, setDisucssions] = useState([]);

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

  const fetchDiscussions = async () => {
    let threads: DiscussionPost[] = [];
    let page = 1
    let hasMorePages = true

    while(hasMorePages){
      await api.get(`/api/discussion/v1/threads/?course_id=${encodeURIComponent(id)}&page=${page}`,
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
          const { data } = response
          const results: any[] = Object.values(data.results)

          results.forEach(item => {
            let thread: DiscussionPost = {
              id: item.id,
              title: item.title,
              preview_body: item.preview_body,
              full_body: item.rendered_body,
              author: item.author,
              vote_count: item.vote_count,
              comment_count: item.comment_count,
              comment_list_url: item.comment_list_url,
              icon: ''
            }

            threads.push(thread)
          })

          // append pfp url to thread object if the author has a custom pfp
          await Promise.all(
            threads.map(async (thread) => {
              const profilePictureUrl = await fetchProfilePicture(thread.author)
              if (profilePictureUrl) {
                thread.icon = profilePictureUrl
              }
              return thread
            })
          )
          const pagination: any = Object(data.pagination)
          if (pagination.next === null){
            hasMorePages = false
          } else {
            page++
          }
        } else {
          setDisucssions(hardCodedDiscussions);
          setIsLoading(false);
          return
        }
      }) .catch((e) => {
          console.log('Error In Discussions Load:');
          const error = Object.assign(e);
          console.log(error);
          setDisucssions(hardCodedDiscussions);
          setIsLoading(false);
          return
        }
      );
    }
    setDisucssions(threads);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDiscussions();
  }, [])

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.translucentOverlay}>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <PrettyHeader title="Discussions" theme="grey" onLeftPress={() => navigation.goBack()} onRightPress={handleProfilePress} />
          <LoadingIcon isLoading={isLoading}>
            <View style={styles.screenBody}>
              <FlatList
                style={styles.list}
                directionalLockEnabled={true}
                data={discussions} 
                //keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.postContainer}
                    onPress={() => handlePostPress(item)}
                  >
                    {item.icon ? <Image defaultSource={iconPlaceholder} source={{ uri: item.icon }} style={styles.pfp} /> : <EvilIcons name="user" size={46} color="white" style={styles.pfp_placeholder} />}
                    <View style={styles.titleRow}>
                      <Text numberOfLines={1} style={styles.postTitle}>
                        {item.title}
                        <Text numberOfLines={1} style={styles.postPreview}>
                          {" " + item.preview_body}
                        </Text>
                      </Text>
                      <Text numberOfLines={1} style={styles.postAuthor}>{item.author}</Text>
                      <View style={styles.counterRow}>
                        <View style={styles.likes}>
                          <AntDesign name="like1" size={16} color="white" style={{ marginRight: 5, }} />
                          <Text style={styles.postCounter}>{item.vote_count}</Text>
                        </View>
                        <View style={styles.posts}>
                          <FontAwesome name="comments" size={16} color="white" style={{ marginRight: 5, }} />
                          <Text style={styles.postCounter}> {item.comment_count - 1}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </LoadingIcon>
          <TouchableOpacity style={styles.plusButtonContainer} onPress={() => handleCreateDiscussionPress()}>
            <View style={styles.plusButton}>
              <FontAwesome name="plus" color='#000' size={18}/>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
});

const backgroundImage = require('../../../assets/images/futuristic-background.png');
const iconPlaceholder = require('../../../assets/icons/pfp-placeholder.png');

const styles = StyleSheet.create({
  plusButtonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 999, // ensure the button is on top of other content
  },
  plusButton: {
    backgroundColor: "#85D5BE",
    borderRadius: 100,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // add some shadow to the button
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    height: '100%',
  },
  translucentOverlay: {
    flex: 1,
    backgroundColor: colors.translucentBackground,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  screenBody: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    width: '100%',
    height: '100%',
  },
  list: {
    width: '100%',
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#fffa',
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  pfp: {
    width: 35,
    height: 35,
    marginLeft: -10,
    marginRight: 10,
    borderRadius: 100,
  },
  pfp_placeholder: {
    marginLeft: -10,
    marginRight: 5,
  },
  titleRow: {
    flex: 1,
  },
  postTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.01,
    color: '#FFF',
    order: 0,
    marginBottom: 2,
  },
  postPreview: {
    fontStyle: 'normal',
    fontSize: 14,
    letterSpacing: 0.01,
    color: '#FFF',
    order: 0,
    marginBottom: 2,
  },
  postAuthor: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.01,
    color: '#FFF',
    order: 0,
    marginBottom: 5,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  posts: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  postLikes: {
    backgroundColor: '#fff',
    flex: 0,
  },
  postComments: {
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
