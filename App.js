<<<<<<< HEAD
import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Dimensions, Button } from "react-native";

export default function App() {
  return (
    <View>
      <Text style={styles.text}>Hello world</Text>
    </View>
=======
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Geo from "./screens/Geo";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> alex_feature_auth
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  text: {
    color: "red",
    alignSelf: "center",
    top: 200,
    fontSize: 50,
=======
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  coord: {
    margin: 10,
    color: "black",
    fontSize: 40,
  },

  headerTitle: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
    textAlign: "center",
    fontSize: 23,
  },
  buttonsBg: {
    marginTop: 20,
>>>>>>> alex_feature_auth
  },
});
