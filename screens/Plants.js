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

const Plants = () => {
  const [animalsList, setAnimalsList] = useState([]);
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
        name: "Animals",
        subnodes: [
          {
            name: "Vertebrates",
            subnodes: [
              {
                name: "Mammals",
                subnodes: [],
              },
            ],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json[0].subnodes);
        json[0].subnodes.map((element) => array.push(element.name));
        // setAnimalsList(JSON.stringify(array));
        // console.log(animalsList);
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

export default Plants;

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
