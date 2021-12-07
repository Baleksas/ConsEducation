import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./routes/homeStack";
const Stack = createNativeStackNavigator();

export default function App() {
  return <Navigator />;
}

const styles = StyleSheet.create({});
