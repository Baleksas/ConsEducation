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

const Mammals = () => {
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
          recordsPerPage: 300,
        },
        recordSubtypeCriteria: [],
        modifiedSince: null,
        locationOptions: null,
        classificationOptions: null,
        speciesTaxonomyCriteria: [
          {
            paramType: "informalTaxonomy",
            informalTaxonomy: "Mammals",
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
        console.log(json);
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

export default Mammals;

const styles = StyleSheet.create({});
