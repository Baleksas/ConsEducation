import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const Animals = () => {
  const [commonNames, setCommonNames] = useState([]);
  const [roundedGRanks, setRoundedGRanks] = useState([]);
  const [scientificNames, setScientificNames] = useState([]);
  const [taxonomicComments, setTaxonomicComments] = useState([]);
  const [nations, setNations] = useState([]);

  const [isExotic, setIsExotic] = useState([]);
  const [isNative, setIsNative] = useState([]);

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const handleHome = () => {
    navigation.replace("Home");
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
          recordsPerPage: null,
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
          setCommonNames((commonNames) => [
            ...commonNames,
            element.primaryCommonName,
          ]);
          setRoundedGRanks((roundedGRanks) => [
            ...roundedGRanks,
            element.gRank,
          ]);
          setScientificNames((scientificNames) => [
            ...scientificNames,
            element.scientificName,
          ]);
          setTaxonomicComments((taxonomicComments) => [
            ...taxonomicComments,
            element.speciesGlobal.taxonomicComments,
          ]);
          setNations((nations) => [...nations, element.nations]);
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
          <Text>{commonNames}</Text>
          <Text>{roundedGRanks}</Text>
          <Text>{scientificNames}</Text>
          <Text>{taxonomicComments}</Text>
          <Text>{JSON.stringify(nations, null, 5)}</Text>
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
});
