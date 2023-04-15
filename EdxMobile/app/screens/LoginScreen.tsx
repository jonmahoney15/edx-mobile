import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, ImageBackground, View, Image, Platform, StatusBar, SafeAreaView, StyleSheet } from "react-native"
import { Button, Icon, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { api } from "../services/api";
import { CLIENT_ID, CLIENT_SECRET } from "@env"
import { LinearGradient } from 'expo-linear-gradient';

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      setAuthToken,
      validationErrors,
    },
  } = useStores()

  useEffect(() => {
    setAuthEmail("jpmahoney@vt.edu")
    setAuthPassword("Password1")
  }, [])

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  const login = async() => {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    
    if (Object.values(validationErrors).some((v) => !!v)) return

    const authenticated = await submitLogin() 

    if (authenticated) {
      fetchAuthToken()
    } else {
      setAuthToken('')
    }

    setIsSubmitted(false)
  }

  const fetchAuthToken = async () => {
    await api.post(
        '/oauth2/access_token/',
        {
        "username": authEmail,
        "password": authPassword,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "client_credentials"
        }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        validateStatus: function (status) {
            return status < 500;
        }
        }
    ).then(response => {
        setAuthToken(response.data.access_token);
    })
    .catch((e) => {
        console.log('In Login Error:');
        console.log(e.toJSON());
        setAuthToken('');
    });
  }

  const submitLogin = async () => {
    const success = await api.post(
        '/api/user/v1/account/login_session/',
        {
          "email": authEmail,
          "password": authPassword
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          validateStatus: function (status) {
            return status < 500;
          }
        }
      ).then(response => {
        return response.data.success ? response.data.success : false;
      })
      .catch((e) => {
        console.log('In Login Error:');
        console.log(e.toJSON());
        return false;
      }
    );

    return success;
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={"white"}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )
  
  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
    <View style={$background}> 
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content"/>
      <SafeAreaView style={styles.container}>
        <View style={styles.screenBody}>
          <Text testID="login-heading" tx="loginScreen.loginScreenTitle" preset="heading" style={$loginScreenTitleStyle}/>
          <Image
              source={require('../../assets/images/app-icon-all.png')}
              style={{width: 100, height: 80, alignSelf: 'center'}}
            />
          {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
          <TextField
            value={authEmail}
            onChangeText={setAuthEmail}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTx="loginScreen.emailFieldPlaceholder"
            helper={errors?.authEmail}
            status={errors?.authEmail ? "error" : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />
          <TextField
            ref={authPasswordInput}
            value={authPassword}
            onChangeText={setAuthPassword}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            placeholderTx="loginScreen.passwordFieldPlaceholder"
            helper={errors?.authPassword}
            status={errors?.authPassword ? "error" : undefined}
            onSubmitEditing={login}
            RightAccessory={PasswordRightAccessory}
          />
          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            style={$tapButton}
            preset="orangeButton"
            onPress={login}
          />
          <Text
            tx="loginScreen.signUp"
            style={$signUpButton}
            onPress={handleSignUpPress}
          />
        </View>
      </SafeAreaView>
      <ImageBackground source={require('../../assets/images/loginPageImage.png')} 
        style={{flex:1, paddingBottom:0, bottom: 0, width:'100%', height: '100%',}}>
        <LinearGradient
           colors={['rgba(0,0,0,0.3)', 'transparent']}
           style={styles.linearGradient}
           start={{ x:0.5, y: 0.01 }}/>
      </ImageBackground>     
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
   
  },
  screenBody: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 46,
  },
  linearGradient: {
    flex: 1,
  },
});

const $background: ViewStyle = {
  flex: 1,
  backgroundColor: 'black',
};

const $loginScreenTitleStyle: TextStyle = {
  marginTop: spacing.large,
  marginBottom: 0,
  color: "white", // add this line to set the text color of the heading to white
  textAlign: 'center',
  fontSize: 28, // set the font size to 28
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.medium,
}

const $tapButton: ViewStyle = {
  marginBottom: spacing.medium,
}

const $signUpButton: TextStyle = {
  textDecorationLine: "underline",
  textAlign: "right",
  fontWeight: "bold",
  color: colors.orangeButtonBackgroundColor
}
