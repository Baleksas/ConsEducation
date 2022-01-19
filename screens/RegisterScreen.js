/*jshint esversion: 6 */

import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
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
import Login from "./LoginScreen";

// Creates a Register Screen, where the users can register, or be redirected back to the login page.
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  // If the user is authenticated, they are redirected to the Home page.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  // If the input passwords match, the user's details are stored in the database.
  const handleSignUp = () => {
    if (password === confirm_password) {
      auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Registered with:", user.email);
          })
          .catch((error) => alert(error.message));
    } else {
      alert("Passwords do not match.");
    }

  };

  // Navigation to the Login page.
  const handleLogin = () => {
    navigation.replace("Login");
  };

  // Renders the page and its elements.
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo2.png")} style={styles.logo} />
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
        <TextInput
          placeholder="ConfirmPassword"
          value={confirm_password}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

// Creates a stylesheet for the design of the page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 0,
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
    marginTop: 40,
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

