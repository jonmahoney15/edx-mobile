import React, { FC, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, StatusBar, SafeAreaView, Platform } from 'react-native';
import { AppStackScreenProps, goBack } from "../navigators";
import { observer } from "mobx-react-lite";
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
import { PrettyHeader } from "../components/PrettyHeader";
import { colors } from "../theme";

interface ModuleScreenProps extends AppStackScreenProps<"Module"> { }

interface ModuleParams {
    id: string;
    title: string;
    duration: string;
    videoId: string;
    bodyText: string;
}

export const ModuleScreen: FC<ModuleScreenProps> = observer(function ModuleScreen(
    _props
) {
    const { navigation } = _props
    const { id, title, duration, videoId, bodyText } = _props.route.params as ModuleParams;
    const [playing, setPlaying] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    useEffect(() => {
        const fetchVideoMetadata = async () => {
            const meta = await getYoutubeMeta(videoId);
            setVideoTitle(meta.title);
        };
        fetchVideoMetadata();
    }, [videoId]);

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    return (
        <ImageBackground source={require('../../assets/images/futuristic_realistic_classroom.png')} resizeMode="cover" style={styles.backgroundImage}>
            <View style={styles.translucentOverlay}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content"/>
                <SafeAreaView style={styles.container}>
                    <PrettyHeader
                            title={title}
                            theme='grey'
                            onLeftPress={goBack}
                            onRightPress={handleProfilePress}
                    />

                    <View style={styles.screenBody}> 
                        <View style={styles.content}>
                            <Text style={styles.text}>{"\n"}{bodyText}</Text>
                        </View>
                        <View style={styles.video}>
                            <Text style={styles.videoTitle}>{videoTitle}</Text>
                            <YoutubePlayer
                                height={300}
                                videoId={videoId}
                                play={playing}
                                onChangeState={onStateChange}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
});

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    screenBody: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 70,
    },
    text: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    videoTitle: {
        fontSize: 13,
        marginBottom: 8,
        color: '#FFFFFF',
    },
    content: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30
    },
    video: {
        alignSelf: 'stretch',
        height: 100,
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 20
    },
    translucentOverlay: {
        flex: 1,
        backgroundColor: colors.translucentBackground,
    }
});

export default ModuleScreen;
