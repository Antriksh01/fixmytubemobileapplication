import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { setUser } from "../redux/user/userSlice";
import axios from "axios";

export default function LoginScreen() {
  const user = useSelector((state) => state?.user?.currentUser);
  console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://fixmytube.com/api/v1/user/userLogin",
        {
          email,
          password,
        }
      );

      console.log(response.data);
      setLoading(false);

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
        dispatch(setUser(response.data.user));
        navigation.navigate("Home", { screen: "Profile" });
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Axios error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert("Info", error.response.data.message);
      } else {
        Alert.alert(
          "Error",
          "An error occurred while processing your request."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logonavfmt.png")} // Replace with your logo path
          style={styles.logo}
        />
      </View>

      {/* Login Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Text>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={userLogin}>
          <Text style={styles.loginButtonText}>
            {loading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Forgot Password and Register Links */}
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={styles.dividerText}>|</Text>
          <Text style={styles.linkText}>
            Don’t have an account?{" "}
            <TouchableOpacity
              onPress={() => Linking.openURL("https://fixmytube.com/")}
            >
              <Text style={styles.registerLink}>Register here</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff", // Light blue background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 0,
    marginTop: -100,
  },
  logoContainer: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#ff3f34", // Red color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  linkText: {
    color: "#ff3f34",
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
  },
  dividerText: {
    marginHorizontal: 5,
    color: "#333",
  },
  registerLink: {
    color: "#ff3f34", // Red color for the link
    textDecorationLine: "underline", // Underline for clickable text
    fontWeight: "bold",
  },
});
