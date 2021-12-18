import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import Camera from "./CameraScreen";
// TODO: needs back button at top left of page, should replace home button
// TODO: Auto generate map rather than button for it?
// TODO implement tab bar


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleGeo = () => {
    navigation.replace("Geo");
  };

  const handleCamera = () => {
      navigation.replace("Camera")

      // return(
      //   <View style={styles.container}>
      //       <Camera />
      //   </View>
      // )
  };


  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleGeo} style={styles.button}>
        <Text style={styles.buttonText}>GPS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCamera} style={styles.button}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
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
