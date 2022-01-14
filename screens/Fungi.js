/*jshint esversion: 6 */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const Fungi = () => {
  const [animalsList, setAnimalsList] = useState();
  let array = [];
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const handleHome = () => {
    navigation.replace("Home");
  };
  useEffect(() => {
    fetch("https://explorer.natureserve.org/api/data/informalTaxonomy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": "350",
      },
      body: JSON.stringify({
        name: "Plants",
        subnodes: [
          {
            name: "Vascular Plants - Flowering Plants",
            subnodes: [
              {
                name: "Dicots",
                subnodes: [],
              },
            ],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.results[0]);
        json.results.forEach((element) => {
          array.push(element.primaryCommonName);
        });
        // setAnimalsList(JSON.stringify(json.results, null, 10));
        setAnimalsList(array);
        setIsLoading(false);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <ScrollView>
      {!isLoading ? <Text>{animalsList}</Text> : <Text>Loading...</Text>}
      <TouchableOpacity style={styles.button} onPress={handleHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Fungi;

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
