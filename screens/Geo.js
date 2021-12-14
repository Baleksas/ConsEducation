import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import map from "../customMap";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
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
  const navigation = useNavigation();

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
  const handleHome = () => {
    navigation.replace("Home");
  };
  let text = "Waiting..";
  let long;
  let lat;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords);
    long = JSON.stringify(location.coords.longitude);
    lat = JSON.stringify(location.coords.latitude);
    // infinit loop renders
    // setLatitude(JSON.stringify(location.coords.latitude));
    // setLongitude(JSON.stringify(location.coords.longitude));
  }

  const handleLocation = () => {
    setRegion({
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };
  return (
    <View>
      <View style={styles.flex}>
        <Text style={styles.locationText}>
          Current latitude: {parseFloat(region.latitude).toFixed(2)}
        </Text>
        <Text style={styles.locationText}>
          Current longitude: {parseFloat(region.longitude).toFixed(2)}
        </Text>
      </View>
      <View>
        <Text style={styles.locationText}>
          {location
            ? `Your location: (${JSON.stringify(
                location.coords.latitude
              )}, ${JSON.stringify(location.coords.longitude)})
              `
            : "No location"}
        </Text>
        <Text>{location && `Updated ago: ${location.timestamp / 1000}`}</Text>
        <View style={styles.flex}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowMap(!showMap)}
          >
            <Text style={styles.buttonText}>SHOW MAP</Text>
          </TouchableOpacity>
          {showMap && (
            <TouchableOpacity style={styles.button} onPress={handleLocation}>
              <Text style={styles.buttonText}>SHOW MY LOCATION ON THE MAP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showMap ? (
        <MapView
          showsMyLocationButton={true}
          region={region}
          style={styles.map}
          onRegionChangeComplete={(region) => setRegion(region)}
          customMapStyle={map}
        >
          <Marker coordinate={tokyoRegion} />
        </MapView>
      ) : (
        <View>
          <Text>No map</Text>
        </View>
      )}

      <View style={styles.flex}>
        <TouchableOpacity style={styles.button} onPress={handleHome}>
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
    alignSelf: "center",
    borderColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    color: "white",
    backgroundColor: "#0782A2",
    padding: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Geo;
