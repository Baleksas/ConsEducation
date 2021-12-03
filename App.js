import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Dimensions, Button } from "react-native";

export default function App() {
  return (
    <View>
      <Text style={styles.text}>Hello world</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "red",
    alignSelf: "center",
    top: 200,
    fontSize: 50,
  },
});
