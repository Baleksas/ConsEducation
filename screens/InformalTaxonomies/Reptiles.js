import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions, Platform, Image,
} from "react-native";
import {useNavigation} from "@react-navigation/core";

// Creates a Reptiles Screen, where all the different reptile species are listed.
// The user can click on a species for more information about them.
const Reptiles = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [AnimalsArray, setAnimalsArray] = useState([
        {
            name: "",
            rank: "",
            scName: "",
            comment: "",
            nations: [],
            isExotic: false,
            isNative: false,
        },
    ]);

    const navigation = useNavigation();

    // Navigation to Mammals page.
    const handleMammals = () => {
        navigation.navigate("Mammals");
    };

    // Navigation to Birds page.
    const handleBirds = () => {
        navigation.navigate("Birds");
    };

    // Navigation to Amphibians page.
    const handleAmphibians = () => {
        navigation.navigate("Amphibians");
    };

    // Navigation to Animals page.
    const handleAll = () => {
        navigation.navigate("Animals");
    };

    // Connects to a public database and retrieves reptile data.
    useEffect(() => {
        fetch("https://explorer.natureserve.org/api/data/speciesSearch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": "350",
            },
            body: JSON.stringify({
                criteriaType: "species",
                textCriteria: [],
                statusCriteria: [],
                locationCriteria: [],
                pagingOptions: {
                    page: null,
                    recordsPerPage: 10000,
                },
                recordSubtypeCriteria: [],
                modifiedSince: null,
                locationOptions: null,
                classificationOptions: null,
                speciesTaxonomyCriteria: [
                    {
                        paramType: "informalTaxonomy",
                        informalTaxonomy: "Reptiles",
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                json.results.forEach((element) => {
                    // Creates an array of the reptile species.
                    setAnimalsArray((AnimalsArray) => [
                        ...AnimalsArray,
                        {
                            name: element.primaryCommonName,
                            rank: element.gRank,
                            scName: element.scientificName,
                            comment: element.speciesGlobal.taxonomicComments,
                            nations: element.nations,
                            lastModified: element.lastModified,
                            saraCode: element.speciesGlobal.saraCode,
                            family: element.speciesGlobal.family,
                            genus: element.speciesGlobal.genus,
                            informalTaxonomy: element.speciesGlobal.informalTaxonomy,
                            completeDistribution: element.speciesGlobal.completeDistribution,
                        },
                    ]);
                });
                setIsLoading(false);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Renders the page and its elements.
    return (
        <View>
            <ScrollView style={styles.animalContainer}>
                {!isLoading ? (
                    <>
                        {AnimalsArray.map((element, index) => (
                            <View key={index}>
                                {index !== 0 && <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("AnimalId", {
                                            ind: index,
                                            works: true,
                                            animal: AnimalsArray[index],
                                        })
                                    }
                                    style={styles.animalTextContainer}
                                >
                                    <Text style={styles.animalIndex}>{index}. </Text>
                                    <Text style={styles.animalText}>{element.name}</Text>
                                </TouchableOpacity>}
                            </View>
                        ))}
                    </>
                ) : (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                )}
            </ScrollView>
            <Image source={require("../../assets/logo.png")} style={styles.logo}/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleMammals} style={styles.button}>
                    <Text style={styles.buttonText}>Mammals</Text>
                </TouchableOpacity>
                <View style={styles.currentButton}>
                    <Text style={styles.currentButtonText}>Reptiles</Text>
                </View>
                <TouchableOpacity onPress={handleBirds} style={styles.button}>
                    <Text style={styles.buttonText}>Birds</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAmphibians} style={styles.button}>
                    <Text style={styles.buttonText}>Amphibians</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAll} style={styles.button}>
                    <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Reptiles;

// Creates a stylesheet for the design of the page.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    loadingContainer: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.7,
        marginBottom: Dimensions.get("window").height * 0.065,
        alignSelf: "center",
        justifyContent: "center",
    },
    animalContainer: {
        marginBottom: Dimensions.get("window").height * 0.062,
    },
    animalText: {
        fontSize: 15,
        marginLeft: 75,
        bottom: 8,
        color: "#788E2D",
        position: "absolute",
        fontWeight: "700",
        alignSelf: "center",
        flexWrap: "wrap",
    },
    animalTextContainer: {
        width: Dimensions.get("window").width * 0.95,
        height: 52,
        backgroundColor: "white",
        borderColor: "#788E2D",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 5,
        alignSelf: "center",
    },
    animalIndex: {
        fontSize: 15,
        fontWeight: "700",
        bottom: 7,
        marginLeft: 5,
        color: "#788E2D",
        position: "absolute",
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
        top: Platform.OS === 'ios' ? Dimensions.get("window").height * 0.825 : Dimensions.get("window").height * 0.865,
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
        fontSize: 12,
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
        fontSize: 12,
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
        right: 10,
        top: 10,
        resizeMode: "contain",
    },
});
