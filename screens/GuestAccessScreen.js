/*jshint esversion: 6 */

import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

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
    const handleLogin = () => {
      navigation.navigate("Login");
    };
    const handleRegister = () => {
      navigation.navigate("Register");
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo2.png")} style={styles.logo} />
            <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>To access the full features of the app, please</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.loginText}>or</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.loginLink}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGeo} style={styles.button}>
                    <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
                <View style={styles.currentButton}>
                    <Text style={styles.currentButtonText}>Home</Text>
                </View>
                <TouchableOpacity onPress={handleSelection} style={styles.button}>
                    <Text style={styles.buttonText}>Animals</Text>
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
        width: Dimensions.get("window").width * 0.92,
        height: 100,
        top: Dimensions.get("window").height * 0.44,
        position: "absolute",
        alignSelf: "center",
        resizeMode: "contain",
    },
    loginTextContainer: {
        marginTop: 40,
        marginBottom: 0,
        bottom: 140,
        position: "absolute",
        width: Dimensions.get("window").width * 0.98,
        padding: 15,
        alignItems: "center",
    },
    loginText: {
        color: "grey",
        fontWeight: "700",
        fontSize: 16,
    },
    loginLink: {
        color: "#A2C23D",
        fontWeight: "700",
        fontSize: 18,
        margin: 10,
    },
});
