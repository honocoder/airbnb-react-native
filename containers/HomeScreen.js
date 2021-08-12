import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();

  // States
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch through data (using a useEffect)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log("Data ==>", response.data[0]);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.main}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          let stars = [];
          for (let i = 0; i < Number(item.ratingValue); i++) {
            stars.push(<Entypo name="star" size={18} color="#FBB102" />);
          }
          if (Number(item.ratingValue) === 4) {
            stars.push(<Entypo name="star" size={18} color="#BBBBBB" />);
          }

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <View style={styles.list}>
                <View style={styles.roomcard}>
                  <View style={styles.picAndPrice}>
                    <Image
                      source={{ uri: item.photos[0].url }}
                      style={styles.roompic}
                    />
                    <View style={styles.priceView}>
                      <Text style={styles.priceText}>{item.price} €</Text>
                    </View>
                  </View>
                  <View style={styles.detailsBand}>
                    <View style={styles.roomDetails}>
                      <Text numberOfLines={1} style={styles.roomTitle}>
                        {item.title}
                      </Text>
                      <View style={styles.rating}>
                        <Text style={styles.stars}>
                          {stars.map((star, index) => {
                            return <Text key={index}>{star}</Text>;
                          })}
                        </Text>
                        <Text
                          style={{
                            color: "grey",
                            marginLeft: 5,
                            fontSize: 12,
                            marginTop: 2,
                          }}
                        >
                          {item.reviews} reviews
                        </Text>
                      </View>
                    </View>

                    <Image
                      source={{ uri: item.user.account.photo.url }}
                      style={styles.userpic}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  list: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  roomcard: {
    backgroundColor: "white",
    height: 300,
    width: 350,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },

  picAndPrice: {
    width: 350,
  },

  roompic: {
    height: 200,
    width: 350,

    position: "relative",
  },

  priceView: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 80,
    height: 40,
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
  },

  priceText: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
  },

  detailsBand: {
    width: 350,
    height: 100,
    marginTop: 20,
    position: "relative",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
  },

  roomTitle: {
    fontSize: 20,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
  },

  userpic: {
    height: 60,
    width: 60,
    borderRadius: 50,
    alignSelf: "flex-end",
    position: "absolute",
    top: 0,
    right: 10,
  },

  roomDetails: {
    width: 250,
  },
});
