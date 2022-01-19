/*jshint esversion: 6 */

import { useNavigation } from "@react-navigation/core";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from "react-native";
import { auth } from "../firebase";

// Creates a Settings Screen, where the user's email is displayed
// and the user can delete their account or log out.
const SettingScreen = () => {
  const navigation = useNavigation();

  // Deletes the user's account from the database.
  const handleDelete = () => {
    auth.currentUser
      .delete()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  // Signs the user out.
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  // Navigation to the Map page.
  const handleGeo = () => {
    navigation.navigate("Map");
  };

  // Navigation to the Selection page.
  const handleSelection = () => {
    navigation.navigate("Selection");
  };

  // Navigation to the Home page.
  const handleHome = () => {
    navigation.navigate("Home");
  };

  // Navigation to the Camera page.
  const handleCamera = () => {
    navigation.navigate("Camera");
  };

  // Renders the page and its elements.
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo2.png")} style={styles.logo} />
      </View>
      <Text style={styles.username}>
        Logged in as:
      </Text>
      <Text style={styles.username}>
        {auth.currentUser?.email}
      </Text>
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGeo} style={styles.button}>
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelection} style={styles.button}>
          <Text style={styles.buttonText}>Animals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHome} style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCamera} style={styles.button}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <View style={styles.currentButton}>
          <Text style={styles.currentButtonText}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;

// Creates a stylesheet for the design of the page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: 20,
    color: "#788E2D",
  },
  logoutButtonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  logoutButton: {
    backgroundColor: "#A2C23D",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 15,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
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
    flex: 1,
    height: 50,
    padding: 5,
    margin: 0.5,
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
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 10,
  },
  logoContainer: {
    marginBottom: 20,
    width: "100%",
    padding: 15,
  },
  logo: {
    width: Dimensions.get("window").width * 0.8,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
