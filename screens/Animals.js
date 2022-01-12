import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
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
  const handleHome = () => {
    navigation.navigate("Home");
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
    <ScrollView>
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
        <Text>Loading...</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Animals;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  animalLink: {
    color: "#0782F9",
  },
});
