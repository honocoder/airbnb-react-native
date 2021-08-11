import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    if (email && password) {
      setError("");

      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        alert("Logged in, welcome back!");
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.error === "Unauthorized") {
          setError("Wrong email or password");
        }
      }
    } else {
      setError("Please fill all inputs");
    }
  };

  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView style={styles.main}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-airbnb.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.screenTitle}>Sign in</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <Text style={{ marginTop: 30, color: "red", alignSelf: "center" }}>
          {error}
        </Text>

        <TouchableOpacity
          style={styles.btn}
          title="Sign in"
          onPress={handleSubmit}
        >
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.btnSignUpText}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
  },

  header: {
    height: 100,
    flex: 1,
    marginVertical: 40,
  },

  logo: {
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },

  screenTitle: {
    color: "grey",
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "600",
  },

  form: {
    flex: 1,
    marginTop: 100,
  },

  input: {
    marginVertical: 20,
    // backgroundColor: "lightgreen",
    borderBottomWidth: 1,
    borderBottomColor: "#FFBAC0",
    width: 300,
    alignSelf: "center",
  },

  btn: {
    alignSelf: "center",
    borderWidth: 2.5,
    borderColor: "#EB5A62",
    borderRadius: 30,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },

  btnText: {
    fontSize: 18,
    color: "grey",
    fontWeight: "500",
  },

  btnSignUp: {
    alignSelf: "center",
    marginTop: 20,
  },

  btnSignUpText: {
    color: "grey",
    fontSize: 14,
    marginBottom: 20,
  },
});
