/*jshint esversion: 6 */

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Image,
    TouchableOpacity,
    Pressable,
    Platform,
} from "react-native";

const GuestAccessMap = () => {
    const navigation = useNavigation();
    const handleHome = () => {
        navigation.navigate("GuestAccess");
    };
    const handleSelection = () => {
        navigation.navigate("GuestAccessSelection");
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <View style={styles.currentButton}>
                    <Text style={styles.currentButtonText}>Map</Text>
                </View>
                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelection} style={styles.button}>
                    <Text style={styles.buttonText}>Animals</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GuestAccessMap;

const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: Dimensions.get("window").width,
    },
    map: {
        width: Dimensions.get("window").width,
        height:
            Platform.OS === "ios"
                ? Dimensions.get("window").height * 0.77
                : Dimensions.get("window").height * 0.79,
        alignSelf: "center",
        borderColor: "black",
    },
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: "center",
        alignItems: "center",
    },
    locationTextContainer: {
        backgroundColor: "#788E2D",
        height: Dimensions.get("window").height * 0.07,
    },
    locationText: {
        color: "white",
        padding: 15,
        textAlign: "left",
    },
    buttonContainer: {
        height: Dimensions.get("window").height * 0.065,
        width: "100%",
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        justifyContent: "flex-end",
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
    logo: {
        width: Dimensions.get("window").height * 0.06,
        height: Dimensions.get("window").height * 0.06,
        position: "absolute",
        right: 10,
        top: 5,
        resizeMode: "contain",
    },
});
