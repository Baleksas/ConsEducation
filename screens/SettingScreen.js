/*jshint esversion: 6 */

import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { auth } from "../firebase";
import { Touchable } from "react-native-web";

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleDelete = () => {
    auth.currentUser
      .delete()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleGeo = () => {
    navigation.navigate("Map");
  };
  const handleSelection = () => {
    navigation.navigate("Selection");
  };
  const handleHome = () => {
    navigation.navigate("Home");
  };
  const handleCamera = () => {
    navigation.navigate("Camera");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo2.png")} style={styles.logo} />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: 50,
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
    width: 300,
    height: 100,
    marginTop: 40,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
