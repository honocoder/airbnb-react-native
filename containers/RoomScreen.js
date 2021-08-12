import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import MapView, { MapViewMarker } from "react-native-maps";

export default function RoomScreen({ route }) {
  const navigation = useNavigation();
  // useRoute
  const { params } = useRoute();
  // States
  const [room, setRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  // Fetch data with useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        setRoom(response.data);
        console.log("DATA ======>", room);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const displayStars = (ratingValue) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (ratingValue >= i) {
        tab.push(<Entypo name="star" size={18} color="#FBB102" />);
      } else {
        tab.push(<Entypo name="star" size={18} color="#BBBBBB" />);
      }
    }
    return tab;
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={styles.main}>
      <View style={{ flex: 1 }}>
        <SwiperFlatList
          style={styles.swiper}
          data={room.photos}
          index={0}
          renderItem={({ item }) => {
            <View>
              <Image style={styles.swiperImage} source={{ uri: item.url }} />;
            </View>;
          }}
        ></SwiperFlatList>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {room.title}
      </Text>

      <View style={styles.stars}>
        {displayStars(room.ratingValue)}
        <Text style={styles.reviews}>{room.reviews} reviews</Text>
      </View>

      <View style={styles.userPicView}>
        <Image
          style={styles.userPic}
          source={{ uri: room.user.account.photo.url }}
        />
      </View>

      <View>
        <Text
          numberOfLines={!displayAllText ? 3 : null}
          style={{ marginTop: 20 }}
          onPress={() => {
            setDisplayAllText(!displayAllText);
          }}
        >
          {room.description}
        </Text>
      </View>

      <View>
        <MapView
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
          ></MapView.Marker>
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
  },

  swiper: {
    height: 250,
    width: 200,
  },

  swiperImage: {
    width: 300,
    height: 200,
  },

  title: {
    fontSize: 24,
    width: 320,
    marginBottom: 20,
  },

  stars: {
    flexDirection: "row",
  },

  reviews: {
    color: "grey",
    marginLeft: 5,
    fontSize: 12,
    marginTop: 2,
  },

  userPicView: {
    position: "relative",
  },

  userPic: {
    height: 60,
    width: 60,
    borderRadius: 50,
    position: "absolute",
    right: 10,
    top: -60,
  },

  map: {
    width: 400,
    height: 300,
    marginTop: 20,
  },
});
