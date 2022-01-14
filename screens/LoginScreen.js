/*jshint esversion: 6 */

import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
// TODO: could use username also for email login since password save on ios saves username not email
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, Dimensions,
} from "react-native";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
      return (
          navigation.replace("Register")
      );
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        if (user) {
          navigation.replace("Home");
        }})
        .catch((error) => alert(error.message));
  };

  const handleGuest = () => {
    return (
        navigation.replace("GuestAccess")
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo2.png")} style={styles.logo}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.guestTextContainer}>
        <Text style={styles.guestText}>Or, alternatively, you can try our </Text>
        <TouchableOpacity onPress={handleGuest}>
          <Text style={styles.guestLink}>Guest Access</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#A2C23D",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#A2C23D",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#A2C23D",
    fontWeight: "700",
    fontSize: 16,
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 10,
    width: "100%",
    padding: 15,
  },
  logo: {
    width: Dimensions.get("window").width * 0.8,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain",
  },
  guestTextContainer: {
    marginTop: 30,
    marginBottom: 0,
    width: Dimensions.get("window").width * 0.8,
    padding: 15,
    alignItems: "center",
  },
  guestText: {
    color: "grey",
    fontWeight: "700",
    fontSize: 16,
  },
  guestLink: {
    color: "#A2C23D",
    fontWeight: "700",
    fontSize: 16,
  },
});
