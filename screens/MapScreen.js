/*jshint esversion: 6 */
/*jshint esversion: 8 */

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
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const navigation = useNavigation();
  const handleHome = () => {
    navigation.replace("Home");
  };

  const handleSelection = () => {
    navigation.navigate("Selection");
  };
  const handleCamera = () => {
    navigation.navigate("Camera");
  };
  const handleSettings = () => {
    navigation.navigate("Settings");
  };
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
    <View styles={styles.container}>
      <View>
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationText}>
            {location
              ? `Your location: (${location.coords.latitude.toFixed(
                  4
                )}, ${location.coords.longitude.toFixed(4)})
                `
              : "No location"}
          </Text>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
        <View style={styles.flex}>
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
        ></MapView>
      ) : (
        <View>
          <Text>No map</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <View style={styles.currentButton}>
          <Text style={styles.currentButtonText}>Map</Text>
        </View>
        <TouchableOpacity onPress={handleSelection} style={styles.button}>
          <Text style={styles.buttonText}>Animals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHome} style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCamera} style={styles.button}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings} style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.86,
    alignSelf: "center",
    borderColor: "black",
  },
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
  locationTextContainer: {
    backgroundColor: "#788E2D",
    height: Dimensions.get("window").height * 0.07,
  },
  locationText: {
    color: "white",
    padding: 15,
    textAlign: "left",
  },
  buttonContainer: {
    height: Dimensions.get("window").height * 0.065,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "flex-end",
    top: Platform.OS === 'ios'? Dimensions.get("window").height * 0.825: Dimensions.get("window").height*0.865,
  },
  button: {
    backgroundColor: "#A2C23D",
    opacity: 0.85,
    flex: 1,
    height: 50,
    padding: 5,
    margin: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 10,
  },
  currentButton: {
    backgroundColor: "white",
    borderColor: "#A2C23D",
    borderWidth: 0.5,
    flex: 1,
    height: 50,
    padding: 5,
    margin: 0.5,
  },
  currentButtonText: {
    color: "#A2C23D",
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 10,
  },
  logo: {
    width: Dimensions.get("window").height * 0.06,
    height: Dimensions.get("window").height * 0.06,
    position: "absolute",
    right: 10,
    top: 5,
    resizeMode: "contain",
  },
});
