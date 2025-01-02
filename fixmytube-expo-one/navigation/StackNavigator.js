import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // For hamburger icon
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ToolsScreen from "../screens/ToolsScreen";
import CustomHeader from "../components/CustomHeader";
import BottomTabs from "./BottomTabs";
import ServicesScreen from "../screens/ServicesScreen";
import LoginScreen from "../screens/LoginScreen";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function StackNavigator() {
  const user = useSelector((state) => state?.user?.currentUser);
  console.log(user);
  // const [user, setUser] = useState(false); // User state

  // Drawer Navigator
  function AppDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={{
          header: ({ navigation, route }) => (
            <CustomHeader navigation={navigation} title={route.name} />
          ),
        }}
      >
        <Drawer.Screen
          name="Home"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        {!user && (
          <Drawer.Screen
            name="Login"
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
            initialParams={{ screen: "Login" }}
          />
        )}
        <Drawer.Screen
          name="Tools"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
          initialParams={{ screen: "Tools" }}
        />
        <Drawer.Screen
          name="Services"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
          initialParams={{ screen: "Services" }}
        />
      </Drawer.Navigator>
    );
  }

  // Stack Navigator for Initial Setup
  function AppStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

// Styles for Custom Header
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff3f34",
    paddingHorizontal: 10,
    paddingTop: 30,
    height: 100,
  },
  icon: {
    marginRight: 15,
  },
  logo: {
    width: 80,
    height: 40,
    borderRadius: 5,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
