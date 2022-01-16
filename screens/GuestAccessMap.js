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
import MapView from "react-native-maps";
import map from "../customMap";

const GuestAccessMap = () => {
    const navigation = useNavigation();

    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const handleHome = () => {
        navigation.navigate("GuestAccess");
    };
    const handleSelection = () => {
        navigation.navigate("GuestAccessSelection");
    };

    return (
        <View style={styles.container}>
            <MapView
                showsMyLocationButton={true}
                region={region}
                style={styles.map}
                onRegionChangeComplete={(region) => setRegion(region)}
                customMapStyle={map}
            >
            </MapView>
            <View style={styles.logoContainer}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
            </View>
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
                ? Dimensions.get("window").height
                : Dimensions.get("screen").height,
        borderColor: "black",
        top: 0,
        position: "absolute",
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
        position: "absolute",
        right: 0,
        top: Dimensions.get("window").height * 0.069,
        resizeMode: "contain",
    },
});
