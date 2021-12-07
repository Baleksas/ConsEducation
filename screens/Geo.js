import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const tokyoRegion1 = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const tokyoRegion2 = {
  latitude: 35.7762,
  longitude: 139.8503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const tokyoRegion3 = {
  latitude: 36.6762,
  longitude: 139.9503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const Geo = () => {
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords);
    // infinit loop renders
    // setLatitude(JSON.stringify(location.coords.latitude));
    // setLongitude(JSON.stringify(location.coords.longitude));
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ConsEducation</Text>
      </View>
      <Text style={styles.coord}>{latitude}</Text>
      <Text style={styles.coord}>{longitude}</Text>
      <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      <View style={styles.buttonsBg}>
        <Button
          color="#841584"
          title="SHOW LOCATION"
          onPress={() => setShowLocation(!showLocation)}
        />

        <Button
          color="#841584"
          title="SHOW MAP"
          onPress={() => setShowMap(!showMap)}
        />
      </View>

      {showMap ? (
        <MapView
          initialRegion={tokyoRegion}
          style={styles.map}
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          <Marker coordinate={tokyoRegion} />
          <Marker coordinate={tokyoRegion1} />
          <Marker coordinate={tokyoRegion2} />
          <Marker coordinate={tokyoRegion3} />
        </MapView>
      ) : (
        <View>
          <Text>No map</Text>
        </View>
      )}
      {showLocation ? (
        <Text>{text}</Text>
      ) : (
        <View>
          <Text>No map</Text>
        </View>
      )}
    </View>
  );
};

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
