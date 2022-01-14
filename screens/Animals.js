/*jshint esversion: 6 */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView, Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
// const Animal = (name, rank, scName, comment, nations, isExotic, isNative) => {
//   return (
//     <div>
//       <span>{name}</span>
//       <span>{rank}</span>
//       <span>{scName}</span>
//       <span>{comment}</span>
//       <span>{nations}</span>
//       <span>{isExotic}</span>
//       <span>{isNative}</span>
//     </div>
//   );
// };
const Animals = () => {
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

  const [isLoading, setIsLoading] = useState(true);

  const handleGeo = () => {
    navigation.navigate("Map");
  };
  const handleHome = () => {
    navigation.navigate("Home");
  };
  const handleCamera = () => {
    navigation.navigate("Camera");
  };
  const handleSettings = () => {
    navigation.navigate("Settings");
  };

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
          recordsPerPage: 300,
        },
        recordSubtypeCriteria: [],
        modifiedSince: null,
        locationOptions: null,
        classificationOptions: null,
        speciesTaxonomyCriteria: [],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((element) => {
          console.log(element);
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
              {/* <Text>{commonNames}</Text>
              <Text>{roundedGRanks}</Text>
              <Text>{scientificNames}</Text>
              <Text>{taxonomicComments}</Text>
              <Text>{JSON.stringify(nations, null, 5)}</Text> */}
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
            // commonNames.forEach((el, index) => {
            //     <Text>{commonNames[index]}</Text>{" "}
            //     <Text>{roundedGRanks[index]}</Text>{" "}
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleGeo} style={styles.button}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
          <View style={styles.currentButton}>
            <Text style={styles.currentButtonText}>Animals</Text>
          </View>
          <TouchableOpacity onPress={handleHome} style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCamera} style={styles.button}>
            <Text style={styles.buttonText}>Camera </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSettings} style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default Animals;

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
