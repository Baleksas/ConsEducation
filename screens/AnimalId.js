/*jshint esversion: 6 */

import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Screen,
    TouchableOpacity,
    ScrollView, Dimensions, Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
const AnimalId = ({ navigation, route }) => {
  const { ind, works, animal } = route.params;
  return (

    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
      </View>
      <View style={styles.textContainerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Name: {animal.name}</Text>
        </View>
        <View  style={styles.textContainer}>
          <Text style={styles.text}>Scientific name: {animal.scName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Informal Taxonomy: {animal.informalTaxonomy}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Genus: {animal.genus}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Family: {animal.family}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Rank: {animal.rank}</Text>
        </View>
        {animal.completeDistribution && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Complete distribution: {animal.completeDistribution ? "Yes" : "No"}</Text>
          </View>)}
      </View>
    </View>
  );
};

export default AnimalId;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "white",
    },
    text: {
        fontSize: 14.2,
        color: "#788E2D",
        fontWeight: "700",
        flexWrap: "wrap",
        marginTop: 6,
        marginLeft: 5,
    },
    textContainer: {
        height: 40,
        width: Dimensions.get("window").width,
        borderColor: "#C1C1C1",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 35,
        alignSelf: "center",
    },
    textContainerContainer: {
      marginTop: Dimensions.get("window").height * 0.08,
    },
    logo: {
        width: Dimensions.get("window").height * 0.06,
        height: Dimensions.get("window").height * 0.06,
        position: "absolute",
        top: 7,
        right: 10,
        resizeMode: "contain",
    },
    logoContainer: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.08,
        position: "absolute",
        top: 0,
        backgroundColor: "#788E2D",
    },
});
