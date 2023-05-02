import React, { FC, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Platform, Alert } from 'react-native';
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors } from "../../theme"
import { observer } from "mobx-react-lite"
import { PrettyHeader } from "../../components/PrettyHeader";
import { api } from "../../services/api";
import { LoadingIcon } from "../../components";

const backgroundImage = require("../../../assets/images/futuristic_realistic_classroom.png")

interface CreateDiscussionScreenProps extends AppStackScreenProps<"CreateDiscussion"> { }

export const CreateDiscussionScreen: FC<CreateDiscussionScreenProps> = observer(function CreateDiscussionScreen(
    _props
) {
const { navigation } = _props
const { id, update } = _props.route.params
const {
  authenticationStore: { logout, authToken },
} = useStores()

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true)
    const discussion = {
      course_id: id,
      topic_id: `Discussion for ${id}`,
      type: "discussion",
      title: postTitle,
      raw_body: postContent
    }

    await api.post("/api/discussion/v1/threads/",
    JSON.stringify(discussion),
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      validateStatus: function (status) {
        return status < 500;
      }
    }
    ).then(async response => {
      if (response.status === 200) {
        setPostContent("")
        setPostTitle("")
        await update()
        
        Alert.alert("Success!", "Created Discussion Thread", [{
          text: 'OK',
          onPress: () => navigation.navigate("Discussion")
        }])
      }

      setIsLoading(false);
    })
    .catch((e) => {
        console.log('Error In Course Progress Load:');
        const error = Object.assign(e);
        console.log(error)
        setIsLoading(false);
    });
  };

  const handleCancel = () => {
    navigation.navigate('Discussion');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const readyToSubmit = () => postContent.length > 0 && postTitle.length > 0

  return (
  
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.translucentOverlay}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content"/>
        <SafeAreaView style={styles.container}>
          <PrettyHeader title="Create Discussion Post" theme="grey" onLeftPress={() => navigation.goBack()} onRightPress={handleProfilePress}/>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Post Title</Text>
            <TextInput
              style={[styles.input, styles.postTitleInputBox]}
              placeholder="Enter post title"
              placeholderTextColor={colors.textDim}
              value={postTitle}
              onChangeText={(text)=>setPostTitle(text)}
              editable={!isLoading}
            />
            <Text style={styles.inputTitle}>Post Content</Text>
            <TextInput
              style={[styles.input, styles.postContentInputBox]}
              placeholder="Enter post content"
              placeholderTextColor={colors.textDim}
              value={postContent}
              onChangeText={(text) => setPostContent(text)}
              multiline={true}
              numberOfLines={10}
              editable={!isLoading}
            />
            <LoadingIcon isLoading={isLoading}>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={readyToSubmit() ? styles.submitButton : styles.disabledButton} disabled={!readyToSubmit()} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </LoadingIcon>
          </View>
        </SafeAreaView>      
      </View>
    </ImageBackground>
      

     
  
  )
});

const styles = StyleSheet.create({
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
  backgroundTransparency: {
    flex: 1,
    backgroundColor: '#000c',
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
  },
  inputTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.primaryButton,
  },
  input: {
    height: 40,
    borderColor: colors.primaryButton,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: colors.text
  },
  postTitleInputBox: {
    textAlignVertical: 'top', 
    marginBottom: 20,
    backgroundColor: '#282424',
  },
  postContentInputBox: {
    height: '50%',
    textAlignVertical: 'top', 
    paddingTop: 10,
    marginBottom: 5,
    backgroundColor: '#282424',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: colors.primaryButton,
    fontSize: 14
  },
  submitButton: {
    backgroundColor:  colors.primaryButton,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  disabledButton: {
    backgroundColor: "grey",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 14
  }

});

export default CreateDiscussionScreen;
