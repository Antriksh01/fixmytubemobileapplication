import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "../components/CustomHeader"; // Import CustomHeader
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ToolsScreen from "../screens/ToolsScreen";
import ServicesScreen from "../screens/ServicesScreen";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const user = useSelector((state) => state?.user?.currentUser);
  console.log(user);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation, route }) => (
          <CustomHeader navigation={navigation} title={route.name} />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home-sharp" : "home-outline"; // Active and inactive icons
          } else if (route.name === "Tools") {
            iconName = focused ? "construct" : "construct-outline";
          } else if (route.name === "Services") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (user && route.name === "Profile") {
            iconName = focused ? "person-sharp" : "person-outline";
          } else if (!user && route.name === "Login") {
            iconName = focused ? "log-in-sharp" : "log-in-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#ffffff", // Active tab color
        tabBarInactiveTintColor: "#d1d1d1", // Inactive tab color
        tabBarStyle: styles.tabBar, // Apply custom styles
        tabBarLabelStyle: styles.tabBarLabel, // Label styling
        tabBarIconStyle: styles.tabBarIcon, // Icon styling
        tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Dashboard", // Custom label
        }}
      />

      <Tab.Screen
        name="Tools"
        component={ToolsScreen}
        options={{
          tabBarLabel: "Tools",
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarLabel: "Services",
        }}
      />
      {user ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "My Profile",
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarLabel: "Login",
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1e1e2d", // Deep dark background
    height: 75, // Height for a premium look
    borderTopLeftRadius: 20, // Rounded corners
    borderTopRightRadius: 20,
    borderTopWidth: 0, // Remove default border
    elevation: 8, // Add shadow on Android
    position: "absolute", // Floating effect
    bottom: 0, // Distance from the bottom
    left: 15,
    right: 15,
    paddingTop: 10,
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 12, // Font size for tab labels
    fontWeight: "bold", // Bold font for better readability
    paddingBottom: 1, // Spacing below the icon
    color: "#fff",
  },
  tabBarIcon: {
    paddingTop: 5, // Spacing above the label
  },
});
