import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Geo from "./screens/Geo";
import RegisterScreen from "./screens/RegisterScreen";
import GuestAccessScreen from "./screens/GuestAccessScreen";
import CameraScreen from "./screens/CameraScreen";
const Stack = createNativeStackNavigator();

export default function App()  {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="GuestAccess"
          component={GuestAccessScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Camera"
          component={CameraScreen}
        />
        <Stack.Screen name="Geo" component={Geo} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "red",
    alignSelf: "center",
    top: 200,
    fontSize: 50,
  },
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
