import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();

    const handleDelete = () => {
        auth
            .currentUser.delete()
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
    navigation.navigate("Geo");
  };
  const handleAnimals = () => {
    navigation.navigate("Animals");
  };
  const handlePlants = () => {
    navigation.navigate("Plants");
  };
  const handleCamera = () => {
    navigation.navigate("Camera");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleGeo} style={styles.button}>
        <Text style={styles.buttonText}>GPS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAnimals} style={styles.button}>
        <Text style={styles.buttonText}>Animals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlants} style={styles.button}>
        <Text style={styles.buttonText}>Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCamera} style={styles.button}>
        <Text style={styles.buttonText}>Camera </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
            <Text style={styles.buttonText}>Delete account</Text>
        </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  email: {
    fontSize: 22,
    color: "black",
  },
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
