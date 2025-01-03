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
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const navigationRaw = useNavigation();
  return (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.container}>
          <View style={styles.banner}>
            <LinearGradient
              colors={["#ff3f34", "#4b4b4b"]}
              style={styles.bannerGradient}
            >
              <Text style={styles.bannerText}>AI Tools</Text>
            </LinearGradient>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("AI Social Media Cloner")}
            >
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <Entypo name="video" size={24} color="black" />
                <Text style={styles.cardText}>
                  AI Social Media Video Cloner
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("AI Youtube Video Cloner")}
            >
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <FontAwesome name="video-camera" size={24} color="black" />
                <Text style={styles.cardText}>AI Youtube Video Cloner</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("AI Local Video Cloner")}
            >
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <Entypo name="folder-video" size={24} color="black" />
                <Text style={styles.cardText}>AI Local Video Cloner</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("AI Text To Speech")}
            >
              <LinearGradient
                colors={["#ff3f34", "#f7d794"]}
                style={styles.gradient}
              >
                <MaterialCommunityIcons
                  name="text-to-speech"
                  size={24}
                  color="black"
                />
                <Text style={styles.cardText}>AI Text To Speech</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.banner}>
            <LinearGradient
              colors={["#16a085", "#4b4b4b"]}
              style={styles.bannerGradient}
            >
              <Text style={styles.bannerText}>Generator Tools</Text>
            </LinearGradient>
          </View>
          {/* <Text style={styles.heading}>Generator Tools</Text> */}
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Meta Data Generator")
              }
            >
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Entypo name="youtube" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Meta Data Generator</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Hashtag Generator")
              }
            >
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <FontAwesome name="hashtag" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Hashtag Generator</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("YouTube Tag Generator")}
            >
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <AntDesign name="tag" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Tag Generator</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Embed Code Generator")
              }
            >
              <LinearGradient
                colors={["#16a085", "#f7d794"]}
                style={styles.gradient}
              >
                <Entypo name="code" size={24} color="black" />
                <Text style={styles.cardText}>
                  Youtube Embed Code Generator
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.banner}>
            <LinearGradient
              colors={["#0abde3", "#4b4b4b"]}
              style={styles.bannerGradient}
            >
              <Text style={styles.bannerText}>Youtube SEO Tools</Text>
            </LinearGradient>
          </View>
          {/* <Text style={styles.heading}>Youtube SEO Tools</Text> */}
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("YouTube Video Statistics")}
            >
              <LinearGradient
                colors={["#0abde3", "#c8d6e5"]}
                style={styles.gradient}
              >
                <MaterialIcons name="query-stats" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Video Statistics</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Channel Statistics")
              }
            >
              <LinearGradient
                colors={["#0abde3", "#c8d6e5"]}
                style={styles.gradient}
              >
                <MaterialIcons name="wifi-channel" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Channel Statistics</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Channel Monetization Checker")
              }
            >
              <LinearGradient
                colors={["#0abde3", "#c8d6e5"]}
                style={styles.gradient}
              >
                <MaterialCommunityIcons
                  name="monitor-dashboard"
                  size={24}
                  color="black"
                />
                <Text style={styles.cardText}>
                  YouTube Channel Monetization Checker
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("AI Thumbnails Cloner")}
            >
              <LinearGradient
                colors={["#0abde3", "#c8d6e5"]}
                style={styles.gradient}
              >
                <Foundation name="thumbnails" size={24} color="black" />
                <Text style={styles.cardText}>AI Thumbnails Cloner</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.banner}>
            <LinearGradient
              colors={["#ff9f43", "#4b4b4b"]}
              style={styles.bannerGradient}
            >
              <Text style={styles.bannerText}>Extractor Tools</Text>
            </LinearGradient>
          </View>
          {/* <Text style={styles.heading}>Extractor Tools</Text> */}
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Channel ID Finder")
              }
            >
              <LinearGradient
                colors={["#ff9f43", "#c8d6e5"]}
                style={styles.gradient}
              >
                <AntDesign name="find" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Channel ID Finder</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("Youtube Tag Extractor")}
            >
              <LinearGradient
                colors={["#ff9f43", "#c8d6e5"]}
                style={styles.gradient}
              >
                <AntDesign name="tag" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Tag Extractor</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("YouTube Title Extractor")}
            >
              <LinearGradient
                colors={["#ff9f43", "#c8d6e5"]}
                style={styles.gradient}
              >
                <MaterialCommunityIcons
                  name="subtitles"
                  size={24}
                  color="black"
                />
                <Text style={styles.cardText}>YouTube Title Extractor</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Description Extractor")
              }
            >
              <LinearGradient
                colors={["#ff9f43", "#c8d6e5"]}
                style={styles.gradient}
              >
                <MaterialIcons name="description" size={24} color="black" />
                <Text style={styles.cardText}>
                  Youtube Description Extractor
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.banner}>
            <LinearGradient
              colors={["#81ecec", "#4b4b4b"]}
              style={styles.bannerGradient}
            >
              <Text style={styles.bannerText}>Other Tools</Text>
            </LinearGradient>
          </View>
          {/* <Text style={styles.heading}>Other Tools</Text> */}
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Timestamp Link Generator")
              }
            >
              <LinearGradient
                colors={["#81ecec", "#c8d6e5"]}
                style={styles.gradient}
              >
                <Entypo name="link" size={24} color="black" />
                <Text style={styles.cardText}>
                  Youtube Timestamp Link Generator
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("Youtube Video Count Checker")
              }
            >
              <LinearGradient
                colors={["#81ecec", "#c8d6e5"]}
                style={styles.gradient}
              >
                <Entypo name="folder-video" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Video Count Checker</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Channel Age Checker")
              }
            >
              <LinearGradient
                colors={["#81ecec", "#c8d6e5"]}
                style={styles.gradient}
              >
                <MaterialIcons name="wifi-channel" size={24} color="black" />
                <Text style={styles.cardText}>YouTube Channel Age Checker</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("Youtube Comment Picker")}
            >
              <LinearGradient
                colors={["#81ecec", "#c8d6e5"]}
                style={styles.gradient}
              >
                <FontAwesome name="comments" size={24} color="black" />
                <Text style={styles.cardText}>Youtube Comment Picker</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("YouTube Money Calculator")}
            >
              <LinearGradient
                colors={["#81ecec", "#c8d6e5"]}
                style={styles.gradient}
              >
                <FontAwesome name="money" size={24} color="black" />
                <Text style={styles.cardText}>YouTube Money Calculator</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("Case Convertor")}
            >
              <LinearGradient
                colors={["#81ecec", "#c8d6e5"]}
                style={styles.gradient}
              >
                <MaterialCommunityIcons
                  name="format-letter-case-upper"
                  size={24}
                  color="black"
                />
                <Text style={styles.cardText}>Case Convertor</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("Create Youtube Channel")}
            >
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <Entypo name="link" size={24} color="black" />
                <Text style={styles.cardText}>Create Youtube Channel</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("Create Channel Logo")}
            >
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
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("Create Thumbnails")}
            >
              <LinearGradient
                colors={["#81ecec", "#ffcccc"]}
                style={styles.gradient}
              >
                <MaterialIcons name="wifi-channel" size={24} color="black" />
                <Text style={styles.cardText}>Create Thumbnails</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigationRaw.navigate("Create Banner")}
            >
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
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("YouTube Channel Customization")
              }
            >
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
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigationRaw.navigate("Youtube Channel Monetization")
              }
            >
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

export default HomeScreen;
