/*jshint esversion: 6 */

import React, {useState} from "react";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions, Image, Platform
} from "react-native";
import {useNavigation} from "@react-navigation/core";

// Creates a Guest Access Animal Selection Screen, where the user can choose to
// navigate between the different species based on their class.
// Different from user version because of the limited navigation bar.
const SelectionScreen = () => {
    const navigation = useNavigation();
    const [taxonomies, setTaxonomies] = useState();

    // Navigation to Guest Access Map page.
    const handleGeo = () => {
        navigation.navigate("GuestAccessMap");
    };

    // Navigation to Guest Access Home page.
    const handleHome = () => {
        navigation.navigate("GuestAccess");
    };

    // Navigation to a page of a different animal subgroup based on the user's choice.
    const handleCustom = (custom) => {
        navigation.navigate(`${custom}`);
    };

    // Renders the page and its elements.
    return (
        <View>
            <Image source={require("../assets/logo.png")} style={styles.logo}/>
            <View style={styles.animalContainer}>
                <View style={styles.animalButtonContainer}>
                    <TouchableOpacity
                        style={styles.animalButton1}
                        onPress={() => handleCustom("Mammals")}
                    >
                        <Text style={styles.animalButton1Text}>Mammals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.animalButton2}
                        onPress={() => handleCustom("Reptiles")}
                    >
                        <Text style={styles.animalButton2Text}>Reptiles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.animalButton1}
                        onPress={() => handleCustom("Birds")}
                    >
                        <Text style={styles.animalButton1Text}>Birds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.animalButton2}
                        onPress={() => handleCustom("Amphibians")}
                    >
                        <Text style={styles.animalButton2Text}>Amphibians</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.animalButton1}
                        onPress={() => handleCustom("Animals")}
                    >
                        <Text style={styles.animalButton1Text}>All animals</Text>
                    </TouchableOpacity>
                    {/* {} */}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGeo} style={styles.button}>
                    <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <View style={styles.currentButton}>
                    <Text style={styles.currentButtonText}>Animals</Text>
                </View>
            </View>
        </View>
    );
};

export default SelectionScreen;

// Creates a stylesheet for the design of the page.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get("window").height * 0.065,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    loadingContainer: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.86,
        marginBottom: Dimensions.get("window").height * 0.065,
        alignSelf: "center",
        justifyContent: "center",
    },
    animalContainer: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.9,
        marginBottom: Dimensions.get("window").height * 0.065,
        alignSelf: "center",
    },
    animalButtonContainer: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.8,
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 135,
    },
    animalButton1: {
        backgroundColor: "#A2C23D",
        width: "100%",
        height: Dimensions.get("window").height * 0.1,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },
    animalButton2: {
        backgroundColor: "white",
        borderColor: "#A2C23D",
        borderWidth: 2,
        width: "100%",
        height: Dimensions.get("window").height * 0.1,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 28,
    },
    animalButton1Text: {
        color: "white",
        fontWeight: "700",
        fontSize: 28,
    },
    animalButton2Text: {
        color: "#A2C23D",
        fontWeight: "700",
        fontSize: 25,
    },
    loadingText: {
        color: "#A2C23D",
        fontWeight: "700",
        fontSize: 40,
        alignSelf: "center",
        position: "absolute",
    },
    buttonContainer: {
        height: Dimensions.get("window").height * 0.065,
        width: "100%",
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        top: Platform.OS === 'ios' ? Dimensions.get("window").height * 0.94 : Dimensions.get("window").height * 0.982,
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
    animalLink: {
        color: "#0782F9",
    },
    logo: {
        width: Dimensions.get("window").height * 0.06,
        height: Dimensions.get("window").height * 0.06,
        position: "absolute",
        right: 20,
        top: Dimensions.get("window").height * 0.09,
        resizeMode: "contain",
    },
});
