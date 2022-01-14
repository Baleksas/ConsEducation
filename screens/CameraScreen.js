/*jshint esversion: 6 */
/*jshint esversion: 8*/

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/core";
import * as Location from "expo-location";

const CameraScreen = () => {
  const handleHome = () => {
    navigation.replace("Home");
  };
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const ref = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return handleHome();
  }

  const handleGeo = () => {
    navigation.navigate("Map");
  };
  const handleSelection = () => {
    navigation.navigate("Selection");
  };
  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handlePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    console.log(photo);
    const photo_lat = location.coords.latitude;
    const photo_long = location.coords.longitude;
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={"auto"} ref={ref}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.cameraText}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePhoto} style={styles.cameraButton}>
            <Text style={styles.cameraText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGeo} style={styles.button}>
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelection} style={styles.button}>
          <Text style={styles.buttonText}>Animals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHome} style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <View style={styles.currentButton}>
          <Text style={styles.currentButtonText}>Camera</Text>
        </View>
        <TouchableOpacity onPress={handleSettings} style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    flex: 1,
    width: "100%",
    height: 22,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 100,
  },
  cameraButton: {
    flex: 0.25,
    alignItems: "center",
    alignSelf: "center",
  },
  cameraText: {
    fontSize: 18,
    color: "white",
  },
  buttonContainer: {
    height: Dimensions.get("window").height * 0.065,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
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
  flex: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
  },
  logoContainer: {
    width: Dimensions.get("window").height * 0.06,
    height: Dimensions.get("window").height * 0.06,
    position: "absolute",
    right: 5,
    top: 5,
    margin: 10,
    marginTop: 10,
  },
  logo: {
    width: Dimensions.get("window").height * 0.06,
    height: Dimensions.get("window").height * 0.06,
    resizeMode: "contain",
  },
});
