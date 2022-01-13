/*jshint esversion: 6 */

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Animals from "./screens/Animals";
import AnimalId from "./screens/AnimalId";

import Plants from "./screens/Plants";

import Geo from "./screens/Geo";
import RegisterScreen from "./screens/RegisterScreen";
import GuestAccessScreen from "./screens/GuestAccessScreen";
import CameraScreen from "./screens/CameraScreen";
import SettingScreen from "./screens/SettingScreen";
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="GuestAccess"
          component={GuestAccessScreen}
        />
        <Stack.Screen

          name="Camera"
          component={CameraScreen}
        />
        <Stack.Screen name="Geo" component={Geo} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen name="Animals" component={Animals} />
        <Stack.Screen
          name="AnimalId"
          component={AnimalId}
          initialParams={{ index: 1, works: false }}
          options={({ route }) => ({
            title:
              route.params.animal.name.length > 30
                ? route.params.animal.name.split(" ").slice(0, 3).join(" ")
                : route.params.animal.name,
          })}
        />
        <Stack.Screen name="Plants" component={Plants} />
        <Stack.Screen name="Settings" component={SettingScreen}/>
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
