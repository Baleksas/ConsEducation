/*jshint esversion: 6 */

import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";

import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../firebase";

const GuestAccessScreen = () => {
    const navigation = useNavigation();
    const [taxonomies, setTaxonomies] = useState();

    const handleGeo = () => {
        navigation.navigate("GuestAccessMap");
    };
    const handleHome = () => {
        navigation.navigate("GuestAccessScreen");
    };
    const handleSelection = () => {
        navigation.navigate("GuestAccessSelection");
    };
    const handleCustom = (custom) => {
        navigation.navigate(`${custom}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.username}>
                Logged in as: {auth.currentUser?.username}
            </Text>
            <Text style={styles.email}>Email: {auth.currentUser?.email}</Text>
            <Image source={require("../assets/logo2.png")} style={styles.logo} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGeo} style={styles.button}>
                    <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
                <View style={styles.currentButton}>
                    <Text style={styles.currentButtonText}>Home</Text>
                </View>
                <TouchableOpacity onPress={handleSelection} style={styles.button}>
                    <Text style={styles.buttonText}>Selection</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GuestAccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    email: {
        position: "absolute",
        top: 75,
        left: 5,
        fontSize: 22,
        color: "black",
    },
    username: {
        position: "absolute",
        top: 50,
        left: 5,
        fontSize: 22,
        color: "black",
    },
    buttonContainer: {
        height: 50,
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
