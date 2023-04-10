import React, { FC } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Platform } from 'react-native';
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors } from "../../theme"
import { observer } from "mobx-react-lite"
import { PrettyHeader } from "../../components/PrettyHeader";

const backgroundImage = require("../../../assets/images/futuristic_realistic_classroom.png")

interface CreateDiscussionScreenProps extends AppStackScreenProps<"CreateDiscussion"> { }

export const CreateDiscussionScreen: FC<CreateDiscussionScreenProps> = observer(function CreateDiscussionScreen(
    _props
) {
const { navigation } = _props
const { route } = _props
const {
  authenticationStore: { logout },
} = useStores()

// const CreateDiscussionScreen: React.FC = () => {
  const [postTitle, setPostTitle] = React.useState('');
  const [postContent, setPostContent] = React.useState('');

  const handlePostTitleChange = (text: string) => {
    setPostTitle(text);
  };

  const handlePostContentChange = (text: string) => {
    setPostContent(text);
  };

  const handleSubmit = () => {
    // Handle submit logic
  };

  const handleCancel = () => {
    // Handle cancel logic
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

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
              placeholderTextColor="#C4C4C4"
              value={postTitle}
              onChangeText={handlePostTitleChange}
            />
            <Text style={styles.inputTitle}>Post Content</Text>
            <TextInput
              style={[styles.input, styles.postContentInputBox]}
              placeholder="Enter post content"
              value={postContent}
              onChangeText={handlePostContentChange}
              multiline={true}
              numberOfLines={10}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: colors.primaryButton,
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

