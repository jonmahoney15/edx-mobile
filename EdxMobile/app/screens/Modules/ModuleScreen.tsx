import React, { FC, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, StatusBar, SafeAreaView, Platform } from 'react-native';
import { AppStackScreenProps } from "../../navigators";
import { observer } from "mobx-react-lite";
import { PrettyHeader } from "../../components/PrettyHeader";
import { colors } from "../../theme";
import { Browser } from "./Browser";

interface ModuleScreenProps extends AppStackScreenProps<"Module"> { }

interface ModuleParams {
    id: string;
    title: string;
    url: string;
}

export const ModuleScreen: FC<ModuleScreenProps> = observer(function ModuleScreen(
    _props
) {
    const { navigation } = _props
    const { id, title, url } = _props.route.params as ModuleParams;

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    return (
    
        <View style={styles.translucentOverlay}>
            <SafeAreaView style={styles.container}>
                <PrettyHeader
                        title={title}
                        theme='grey'
                        onLeftPress={navigation.goBack}
                        onRightPress={handleProfilePress}
                />
                <Browser url={url}/>
                </SafeAreaView>
        </View>
    
    );
});

const backgroundImage = require('../../../assets/images/futuristic-background.png');

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
