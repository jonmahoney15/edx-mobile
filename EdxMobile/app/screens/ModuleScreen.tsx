import React, { FC, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { AppStackScreenProps } from "../navigators";
import { observer } from "mobx-react-lite";
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';

interface ModuleScreenProps extends AppStackScreenProps<"Module"> { }

interface ModuleParams {
    id: string,
    title: string;
    duration: string;
    videoId: string;
    bodyText: string;
}

export const ModuleScreen: FC<ModuleScreenProps> = observer(function ModuleScreen(
    _props
) {
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


    return (
        <ImageBackground source={require('../../assets/images/background_module_image.png')} style={styles.container}>
            <ImageBackground source={require('../../assets/images/module_overlay_background.png')} style={styles.overlay}>
                <View>
                    {/* <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                    </View> */}
                    <View style={styles.content}>
                        {/* <Text style={styles.duration}>{duration}</Text> */}
                        <Text style={styles.duration}>{"\n"}{bodyText}</Text>
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
            </ImageBackground >
        </ImageBackground >
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
    },
    // header: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: 24,
    //     marginTop: 20
    // },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#333',
    },
    duration: {
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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlayImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default ModuleScreen;
