import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";

const ServicesScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.container}>
          <View style={styles.banner}>
            <LinearGradient
              colors={["#ffcccc", "#ff3838"]}
              style={styles.bannerGradient}
            >
              <Text style={styles.bannerText}>Our Services</Text>
            </LinearGradient>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <Entypo name="link" size={24} color="black" />
                <Text style={styles.cardText}>Create Youtube Channel</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <Entypo name="folder-video" size={24} color="black" />
                <Text style={styles.cardText}>Create Channel Logo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <MaterialIcons name="wifi-channel" size={24} color="black" />
                <Text style={styles.cardText}>Create Thumbnails</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <FontAwesome name="comments" size={24} color="black" />
                <Text style={styles.cardText}>Create Banner</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <FontAwesome name="money" size={24} color="black" />
                <Text style={styles.cardText}>
                  YouTube Channel Customization
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <MaterialCommunityIcons
                  name="format-letter-case-upper"
                  size={24}
                  color="black"
                />
                <Text style={styles.cardText}>
                  Youtube Channel Monetization
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "#ff3f34",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden", // Ensures gradient respects the border radius
    elevation: 5,
    height: 150,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  scrollContentContainer: {
    paddingBottom: 80, // Add padding to prevent content from hiding behind the bottom tab
  },
  banner: {
    marginBottom: 20,
  },
  bannerGradient: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default ServicesScreen;
