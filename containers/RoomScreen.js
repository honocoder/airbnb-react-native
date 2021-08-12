import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

export default function RoomScreen({ route }) {
  const navigation = useNavigation();

  // States
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setRoom(response);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  console.log("Data ==>", room);

  const displayStars = (ratingValue) => {
    const tab = [];
    for (let i = 0; i < i <= 5; i++) {
      if (ratingValue >= i) {
        tab.push(<Entypo name="star" size={18} color="#FBB102" />);
      } else {
        tab.push(<Entypo name="star" size={18} color="#BBBBBB" />);
      }
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View>
        <SwiperFlatList
          style={styles.roompics}
          data={room.photos}
          renderItem={({ item }) => {
            console.log(item);
            <Image source={{ uri: item.url }} />;
          }}
          index={0}
          showPagination
        />

        <View>
          <Text>{room.price}</Text>
        </View>
      </View>

      <View>
        <View>{displayStars(room.ratingValue)}</View>

        <Text>{room.review} reviews</Text>
      </View>
      <Image source={{ uri: room.user.account.photo.url }} />

      <Text numberOfLines={3}>{room.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  roompics: {
    width: 300,
    height: 200,
  },
});
