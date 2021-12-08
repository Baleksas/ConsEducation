// import "react-native-gesture-handler";

// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Geo from "./screens/Geo";
// import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import HomeScreen from "./screens/HomeScreen";
// import LoginScreen from "./screens/LoginScreen";

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Login"
//           component={LoginScreen}
//         />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     // <NavigationContainer>
//     //   <Stack.Navigator>
//     //     <Stack.Screen name="Home" component={HomeScreen} />
//     //     <Stack.Screen name="Geo" component={Geo} />
//     //     <Stack.Screen name="Details" component={DetailsScreen} />
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   coord: {
//     margin: 10,
//     color: "black",
//     fontSize: 40,
//   },
//   header: {
//     backgroundColor: "#b1dd9e",
//     height: 100,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     width: Dimensions.get("window").width,
//   },
//   headerTitle: {
//     alignItems: "center",
//     flexDirection: "row",
//     marginVertical: 5,
//     textAlign: "center",
//     fontSize: 23,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
//   buttonsBg: {
//     marginTop: 20,
//   },
// });

// export default App;
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});