/*jshint esversion: 6 */

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
const SelectionScreen = () => {
  const navigation = useNavigation();
  const [taxonomies, setTaxonomies] = useState();

  const handleGeo = () => {
    navigation.navigate("Map");
  };
  const handleHome = () => {
    navigation.navigate("Home");
  };
  const handleCamera = () => {
    navigation.navigate("Camera");
  };
  const handleCustom = (custom) => {
    navigation.navigate(`${custom}`);
  };
  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View>
      <ScrollView style={styles.animalContainer}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCustom("Mammals")}
          >
            <Text style={styles.buttonText}>Mammals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCustom("Reptiles")}
          >
            <Text style={styles.buttonText}>Reptiles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCustom("Birds")}
          >
            <Text style={styles.buttonText}>Birds</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCustom("Amphibians")}
          >
            <Text style={styles.buttonText}>Amphibians</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCustom("Animals")}
          >
            <Text style={styles.buttonText}>All animals</Text>
          </TouchableOpacity>
          {/* {} */}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGeo} style={styles.button}>
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
        <View style={styles.currentButton}>
          <Text style={styles.currentButtonText}>Selection</Text>
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

export default SelectionScreen;

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
