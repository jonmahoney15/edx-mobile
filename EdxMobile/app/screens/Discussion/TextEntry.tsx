import { useStores } from "../../models";
import { api } from "../../services/api";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text} from "react-native";

interface TextEntryProps {
    thread_id: string
    fetchComments
}

export const TextEntry = (props: TextEntryProps) => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const {thread_id, fetchComments} = props;
    const {
        authenticationStore: {
          authToken
        }
    } = useStores();
     
    const handleSubmit = () => {
      const commentData = { 
        thread_id: thread_id,
        raw_body: text,
      };

      api.post(`/api/discussion/v1/comments/`,
        JSON.stringify(commentData),
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          validateStatus: function (status: number) {
            return status < 500;
          },
        }
      ).then(response => {
        if (response.status === 200) {
          fetchComments()
        }
        handleCloseReply()
      })
      .catch((e) => {
        console.log('Sumbit Error:');
        console.log(e.toJSON());
        handleCloseReply();
      })
    }

    const handleCloseReply= () => {
      setText('');
      setVisible(false);
    }

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
                  <Text>
                    Submit
                  </Text>
                </View>
                <Text style={{color:'red'}} onPress={handleCloseReply}>
                    Cancel
                </Text>
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
};   

const styles = StyleSheet.create({
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
        margin: 10
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
      }
})