import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the hamburger icon

const CustomHeader = ({ navigation, title }) => {
  return (
    <View style={styles.header}>
      {/* Hamburger Icon */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.icon}
      >
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Logo */}
      <Image
        source={require("../assets/logofmtfoot.jpg")} // Replace with your logo file
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff3f34",
    paddingHorizontal: 10,
    height: 100,
    paddingTop: 30,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    width: 80,
    height: 40,
    borderRadius: 5,
  },
});

export default CustomHeader;
