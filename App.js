import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="SignIn">
            {(props) => <SignInScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: (
                            <View>
                              <Image
                                style={styles.logo}
                                source={require("./assets/logo-airbnb.png")}
                              />
                            </View>
                          ),
                          headerTitleAlign: "center",
                          headerStyle: {
                            backgroundColor: "white",
                            height: 120,
                            borderBottomColor: "lightgrey",
                            borderBottomWidth: 0.5,
                          },
                        }}
                      >
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: (
                            <View>
                              <Image
                                style={styles.logo}
                                source={require("./assets/logo-airbnb.png")}
                              />
                            </View>
                          ),
                          headerTitleAlign: "center",
                          headerStyle: {
                            backgroundColor: "white",
                            height: 120,
                            borderBottomColor: "lightgrey",
                            borderBottomWidth: 0.5,
                          },
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen name="Around me">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: (
                            <View>
                              <Image
                                style={styles.logo}
                                source={require("./assets/logo-airbnb.png")}
                              />
                            </View>
                          ),
                          headerTitleAlign: "center",
                          headerStyle: {
                            backgroundColor: "white",
                            height: 120,
                            borderBottomColor: "lightgrey",
                            borderBottomWidth: 0.5,
                          },
                          tabBarLabel: "Around me",
                          // tabBarIcon: ({ color, size }) => (
                          //   <FontAwesome
                          //     name={"map-marker"}
                          //     size={size}
                          //     color={color}
                          //   />
                          // ),
                        }}
                      >
                        {() => <AroundMeScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Settings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginVertical: 0,
  },
});
