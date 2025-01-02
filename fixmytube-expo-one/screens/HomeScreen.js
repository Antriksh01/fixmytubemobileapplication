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

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>AI Tools</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>
                  AI Social Media Video Cloner
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>AI Youtube Video Cloner</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>AI Local Video Cloner</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>AI Text To Speech</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>Generator Tools</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>Youtube Meta Data Generator</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>Youtube Hashtag Generator</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>Youtube Tag Generator</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>
                  Youtube Embed Code Generator
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>Youtube SEO Tools</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>Youtube Video Statistics</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>Youtube Channel Statistics</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>
                  YouTube Channel Monetization Checker
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>AI Thumbnails Cloner</Text>
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
});

export default HomeScreen;
