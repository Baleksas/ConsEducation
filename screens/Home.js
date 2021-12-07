import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
// import Geo from "Geo";
export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to GPS" onPress={() => navigation.navigate("Geo")} />
    </View>
  );
}

const styles = StyleSheet.create({});
