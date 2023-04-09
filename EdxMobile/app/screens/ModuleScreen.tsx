import React, { FC, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppStackScreenProps } from "../navigators";
import { observer } from "mobx-react-lite";
import YoutubePlayer from 'react-native-youtube-iframe';

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

    const handleCompleteModule = () => {
        _props.navigation.goBack();
    };

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.duration}>{duration}</Text>
                <Text style={styles.duration}>{"\n"}{bodyText}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <YoutubePlayer
                    height={300}
                    videoId={videoId}
                    play={playing}
                    onChangeState={onStateChange}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#333',
    },
    duration: {
        fontSize: 16,
        color: '#888',
    },
    content: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 16,
    },
    video: {
        alignSelf: 'stretch',
        height: 300,
    },
});

export default ModuleScreen;
