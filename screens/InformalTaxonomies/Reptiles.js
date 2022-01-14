import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const Reptiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

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
  return (
    <View>
      <ScrollView style={styles.animalContainer}>
        {!isLoading ? (
          <>
            {AnimalsArray.map((element, index) => (
              <View key={index}>
                {index !== 0 && <Text>{index}.</Text>}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AnimalId", {
                      ind: index,
                      works: true,
                      animal: AnimalsArray[index],
                    })
                  }
                  style={styles.animalLink}
                >
                  {index !== 0 && <Text>{element.name}</Text>}
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Reptiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.88,
    marginBottom: Dimensions.get("window").height * 0.065,
    alignSelf: "center",
    justifyContent: "center",
  },
  animalContainer: {
    marginBottom: Dimensions.get("window").height * 0.065,
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
  animalLink: {
    color: "#0782F9",
  },
});
