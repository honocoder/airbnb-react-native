import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import MapView, { MapViewMarker } from "react-native-maps";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

export default function AroundMeScreen() {
  const navigation = useNavigation();

  const [around, setAround] = useState("");
  const [coords, setCoords] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );
        console.log("AROUND ME RESPONSE DATA ===>", response.data);
        setAround(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();

    // Ask permission to access device's GPS data
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          // Get GPS data
          const location = await Location.getCurrentPositionAsync({});
          console.log("LOCATION ===>", location);
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setCoords(coords);
          console.log("COORDS ======>", coords);
        } else {
          alert("Permission denied");
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <MapView
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        style={styles.map}
      >
        {around.map((item, index) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: item.location[1],
                longitude: item.location[0],
              }}
              key={index}
              title={item.title}
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
