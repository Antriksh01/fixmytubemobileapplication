import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenTwo, setIsDropdownOpenTwo] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownTwo = () => {
    setIsDropdownOpenTwo(!isDropdownOpenTwo);
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Add your regular Drawer Items */}
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
        icon={() => <Ionicons name="home-outline" size={24} />}
      />

      {/* Dropdown Toggle */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownToggle}>
        <Text style={styles.dropdownText}>Tools</Text>
        <Ionicons
          name={isDropdownOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
        />
      </TouchableOpacity>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AI Social Media Cloner")}
            style={styles.dropdownItem}
          >
            <Text>AI Social Media Cloner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AI Youtube Video Cloner")}
            style={styles.dropdownItem}
          >
            <Text>AI Youtube Video Cloner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AI Local Video Cloner")}
            style={styles.dropdownItem}
          >
            <Text>AI Local Video Cloner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AI Text To Speech")}
            style={styles.dropdownItem}
          >
            <Text>AI Text To Speech</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Video Statistics")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Video Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Channel Statistics")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Channel Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Channel Monetization Checker")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Channel Monetization Checker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AI Thumbnails Cloner")}
            style={styles.dropdownItem}
          >
            <Text>AI Thumbnails Cloner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Meta Data Generator")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Meta Data Generator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Hashtag Generator")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Hashtag Generator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("YouTube Tag Generator")}
            style={styles.dropdownItem}
          >
            <Text>YouTube Tag Generator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Embed Code Generator")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Embed Code Generator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Channel ID Finder")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Channel ID Finder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Youtube Tag Extractor")}
            style={styles.dropdownItem}
          >
            <Text>Youtube Tag Extractor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("YouTube Title Extractor")}
            style={styles.dropdownItem}
          >
            <Text>YouTube Title Extractor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Description Extractor")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Description Extractor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Timestamp Link Generator")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Timestamp Link Generator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Youtube Video Count Checker")
            }
            style={styles.dropdownItem}
          >
            <Text>Youtube Video Count Checker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Channel Age Checker")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Channel Age Checker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Youtube Comment Picker")}
            style={styles.dropdownItem}
          >
            <Text>Youtube Comment Picker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Money Calculator")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Money Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Case Convertor")}
            style={styles.dropdownItem}
          >
            <Text>Case Convertor</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Other Drawer Items */}
      {/* <DrawerItem
        label="Services"
        onPress={() => props.navigation.navigate("Services")}
        icon={() => <Ionicons name="construct-outline" size={24} />}
      /> */}

      <TouchableOpacity
        onPress={toggleDropdownTwo}
        style={styles.dropdownToggle}
      >
        <Text style={styles.dropdownText}>Services</Text>
        <Ionicons
          name={
            isDropdownOpenTwo ? "chevron-up-outline" : "chevron-down-outline"
          }
          size={24}
        />
      </TouchableOpacity>

      {/* Dropdown Content */}
      {isDropdownOpenTwo && (
        <View style={styles.dropdownContent}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Create Youtube Channel")}
            style={styles.dropdownItem}
          >
            <Text>Create Youtube Channel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Create Channel Logo")}
            style={styles.dropdownItem}
          >
            <Text>Create Channel Logo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Create Thumbnails")}
            style={styles.dropdownItem}
          >
            <Text>Create Thumbnails</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Create Banner")}
            style={styles.dropdownItem}
          >
            <Text>Create Banner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YouTube Channel Customization")
            }
            style={styles.dropdownItem}
          >
            <Text>YouTube Channel Customization</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Youtube Channel Monetization")
            }
            style={styles.dropdownItem}
          >
            <Text>Youtube Channel Monetization</Text>
          </TouchableOpacity>
        </View>
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  dropdownToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownContent: {
    paddingLeft: 20,
    backgroundColor: "#ffb8b8",
  },
  dropdownItem: {
    paddingVertical: 10,
  },
});

export default CustomDrawerContent;
