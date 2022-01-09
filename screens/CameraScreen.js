import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { Camera } from 'expo-camera';
import {useNavigation} from "@react-navigation/core";

const CameraScreen = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const handleHome = () => {
        navigation.replace("Home")
    }
    const handlePhoto = () => {
        //TODO: Taking of Photos
    }


    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={styles.flex}>
                <TouchableOpacity onPress={handleHome} style={styles.button1}>
                    <Text style={styles.button1Text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePhoto} style={styles.button1}>
                    <Text style={styles.button1Text}>Capture</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    button1container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "baseline",
        alignContent: "flex-start",
    },
    button1: {
        backgroundColor: "#0782F9",
        width: "60%",
        padding: 15,
        alignItems: "center",
    },
    button1Text: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: Dimensions.get("window").width,
    },
});
