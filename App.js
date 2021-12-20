import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Animals from "./screens/Animals";
import Plants from "./screens/Plants";

import Geo from "./screens/Geo";
const Stack = createNativeStackNavigator();

export default function App() {
  const handleHome = () => {
    navigation.replace("Home");
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Geo" component={Geo} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Animals" component={Animals} />
        <Stack.Screen name="Plants" component={Plants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
  },
});
