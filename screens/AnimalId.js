/*jshint esversion: 6 */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Screen,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
const AnimalId = ({ navigation, route }) => {
  const { ind, works, animal } = route.params;
  return (
    <ScrollView>
      <Text>Animal {JSON.stringify(ind)}</Text>
      <Text>Works: {JSON.stringify(works)}</Text>
      <Text>Name: {animal.name}</Text>
      <Text>Rank: {animal.rank}</Text>
      <Text>Scientific name: {animal.scName}</Text>
      {/* <Text>Nations: {animal.nations}</Text> */}

      <Text>informalTaxonomy: {animal.informalTaxonomy}</Text>
      <Text>genus: {animal.genus}</Text>
      <Text>family: {animal.family}</Text>
      {animal.saraCode && <Text>Sara code: {animal.saraCode}</Text>}
      {animal.completeDistribution && (
        <Text>
          Complete distribution: {animal.completeDistribution ? "Yes" : "No"}
        </Text>
      )}

      <Text>Last modified: {animal.lastModified}</Text>
    </ScrollView>
  );
};

export default AnimalId;

const styles = StyleSheet.create({});
