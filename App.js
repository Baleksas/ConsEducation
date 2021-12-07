import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Geo from "./screens/Geo";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HomeScreen from "./screens/Home";

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <ScrollView>
        <Text>TEST</Text> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Geo" component={Geo} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
      {/* <View style={styles.header}> */}
      {/* <Text style={styles.headerTitle}>ConsEducation</Text> */}
      {/* </View> */}
      {/* </ScrollView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  coord: {
    margin: 10,
    color: "black",
    fontSize: 40,
  },
  header: {
    backgroundColor: "#b1dd9e",
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  headerTitle: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
    textAlign: "center",
    fontSize: 23,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonsBg: {
    marginTop: 20,
  },
});

export default App;
