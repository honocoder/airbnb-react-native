import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ navigation, setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // vérifier que tous les champs sont remplis
    if (email && username && password && confirmPassword && description) {
      // vérifier que les 2 MDP sont identiques
      if (password === confirmPassword) {
        setError("");

        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              password,
              description,
              username,
            }
          );

          console.log(response.data);
          console.log(response.data.token);
          setToken(response.data.token);
          alert("You successfully signed up! Welcome 😊");
        } catch (error) {
          console.log(error.response.data); //  { "error": "This username already has an account." }
          if (
            error.response.data.error ===
              "This username already has an account." ||
            error.response.data.error === "This email already has an account."
          ) {
            setError(error.response.data.error);
          } else {
            setError("An error occurred");
          }
        }
      } else {
        setError("Passwords are not the same");
      }
    } else {
      setError("Please fill all inputs");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.main}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-airbnb.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.screenTitle}>Sign up</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
        />
        {console.log({ email })}
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.descInput}
          placeholder="Describe yourself in a few words..."
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <Text style={{ marginTop: 30, color: "red", alignSelf: "center" }}>
          {error}
        </Text>

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnLogIn}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.btnLogInText}>
            Already have an account? Sign in
          </Text>
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
  },

  screenTitle: {
    color: "grey",
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "600",
  },

  form: {
    flex: 1,
  },

  input: {
    marginVertical: 20,
    // backgroundColor: "lightgreen",
    borderBottomWidth: 1,
    borderBottomColor: "#FFBAC0",
    width: 300,
    alignSelf: "center",
  },

  descInput: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#FFBAC0",
    width: 300,
    height: 80,
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
    marginTop: 60,
  },

  btnText: {
    fontSize: 18,
    color: "grey",
    fontWeight: "500",
  },

  btnLogIn: {
    alignSelf: "center",
    marginTop: 20,
  },

  btnLogInText: {
    color: "grey",
    fontSize: 14,
    marginBottom: 50,
  },
});
