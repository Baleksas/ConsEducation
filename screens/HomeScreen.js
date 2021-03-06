/*jshint esversion: 6 */

import {useNavigation} from "@react-navigation/core";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
} from "react-native";

// Creates Home Screen, where the users are redirected
// after logging in, and contains a navigation bar to the rest of the app.
const HomeScreen = () => {
    const navigation = useNavigation();

    // Navigation to Maps page.
    const handleGeo = () => {
        navigation.navigate("Map");
    };
    // Navigation to Animal Selection page.
    const handleSelection = () => {
        navigation.navigate("Selection");
    };
    // Navigation to Camera page.
    const handleCamera = () => {
        navigation.navigate("Camera");
    };
    // Navigation to Settings page.
    const handleSettings = () => {
        navigation.navigate("Settings");
    };

    // Renders the page and its elements.
    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo2.png")} style={styles.logo}/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGeo} style={styles.button}>
                    <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelection} style={styles.button}>
                    <Text style={styles.buttonText}>Animals</Text>
                </TouchableOpacity>
                <View style={styles.currentButton}>
                    <Text style={styles.currentButtonText}>Home</Text>
                </View>
                <TouchableOpacity onPress={handleCamera} style={styles.button}>
                    <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSettings} style={styles.button}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

// Creates a stylesheet for the design of the page.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    logo: {
        width: Dimensions.get("window").width * 0.9,
        height: 100,
        alignSelf: "center",
        resizeMode: "contain",
    },
});
