/*jshint esversion: 6 */
/*jshint esversion: 8*/

import React, {useState, useEffect, useRef} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import {Camera} from "expo-camera";
import {useNavigation} from "@react-navigation/core";
import * as Location from "expo-location";

// Creates a Camera Screen that allows the user to take a photo or flip the camera.
const CameraScreen = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const ref = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const baseUrl = 'https://potatoapi.lucbucher.ch';

    // Asks for location permissions.
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            // Location is set to user's location.
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    // Asks for camera permissions.
    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return handleHome;
    }

    // Creates a sighting in the database.
    async function CreateSighting(data) {
        const res = await fetch(baseUrl + '/Sightings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        data = await res.json();
        return data;
    }

    // Gets the sightings from the database.
    async function GetSightings() {
        const res = await fetch(baseUrl + '/Sightings')
        return (await res.json()).map(f => {
            return {
                id: f.id, latitude: parseFloat(f.latitude),
                longitude: parseFloat(f.longitude)
            }
        });
    }

    // Takes a photo.
    const handlePhoto = async () => {
        const photo = await ref.current.takePictureAsync();
        console.log(photo);
        const photo_lat = location.coords.latitude.toFixed(5);
        const photo_long = location.coords.longitude.toFixed(5);

        // Gets the sightings from the database and stores them in a variable.
        let arrayOfSightings = await GetSightings()

        // Checks if there's a sighting with the same coordinates, if not then adds the photo's location as a sighting.
        if (!arrayOfSightings.filter(f => f.longitude.toFixed(5) === photo_long &&
            f.latitude.toFixed(5) === photo_lat).length) {
            console.log(photo_long.toString(), photo_lat.toString());
            await CreateSighting({
                longitude: photo_long.toString(),
                latitude: photo_lat.toString()
            });
        }
    }

    // Navigation to Home page.
    const handleHome = () => {
        navigation.navigate("Home");
    };

    // Navigation to Map page.
    const handleGeo = () => {
        navigation.navigate("Map");
    };

    // Navigation to Animal Selection page.
    const handleSelection = () => {
        navigation.navigate("Selection");
    };

    // Navigation to Settings page.
    const handleSettings = () => {
        navigation.navigate("Settings");
    };


    // Renders the page and its elements.
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} flashMode={"auto"} ref={ref}>
                <View style={styles.logoContainer}>
                    <Image source={require("../assets/logo.png")} style={styles.logo}/>
                </View>
                <View style={styles.cameraButtonContainer}>
                    <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <Text style={styles.cameraText}> Flip </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePhoto} style={styles.cameraButton}>
                        <Text style={styles.cameraText}>Capture</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGeo} style={styles.button}>
                    <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelection} style={styles.button}>
                    <Text style={styles.buttonText}>Animals</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <View style={styles.currentButton}>
                    <Text style={styles.currentButtonText}>Camera</Text>
                </View>
                <TouchableOpacity onPress={handleSettings} style={styles.button}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CameraScreen;

// Creates a stylesheet for the design of the page.
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    cameraButtonContainer: {
        flex: 1,
        width: "100%",
        height: 22,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 100,
    },
    cameraButton: {
        flex: 0.25,
        alignItems: "center",
        alignSelf: "center",
    },
    cameraText: {
        fontSize: 18,
        color: "white",
    },
    buttonContainer: {
        height: Dimensions.get("window").height * 0.065,
        width: "100%",
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
    },
    button: {
        backgroundColor: "#A2C23D",
        opacity: 0.85,
        flex: 1,
        height: 50,
        padding: 5,
        margin: 0.5,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
        alignSelf: "center",
        marginTop: 10,
    },
    currentButton: {
        backgroundColor: "white",
        borderColor: "#A2C23D",
        borderWidth: 0.5,
        flex: 1,
        height: 50,
        padding: 5,
        margin: 0.5,
    },
    currentButtonText: {
        color: "#A2C23D",
        fontWeight: "700",
        fontSize: 16,
        alignSelf: "center",
        marginTop: 10,
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: Dimensions.get("window").width,
    },
    logoContainer: {
        width: Dimensions.get("window").height * 0.06,
        height: Dimensions.get("window").height * 0.06,
        position: "absolute",
        right: 5,
        top: 5,
        margin: 10,
        marginTop: 10,
    },
    logo: {
        width: Dimensions.get("window").height * 0.06,
        height: Dimensions.get("window").height * 0.06,
        resizeMode: "contain",
    },
});
