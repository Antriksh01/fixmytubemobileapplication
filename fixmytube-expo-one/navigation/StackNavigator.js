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
import AISocialMediaCloner from "../screens/Tools/AISocialMediaCloner";
import CustomDrawerContent from "../components/CustomDrawerContent";
import CreateYoutubeChannel from "../screens/Services/CreateYoutubeChannel";
import AIYoutubeVideoCloner from "../screens/Tools/AIYoutubeVideoCloner";
import AILocalVideoCloner from "../screens/Tools/AILocalVideoCloner";
import AITextToSpeech from "../screens/Tools/AITextToSpeech";
import YouTubeVideoStatistics from "../screens/Tools/YouTubeVideoStatistics";
import YouTubeChannelStatistics from "../screens/Tools/YouTubeChannelStatistics";
import YouTubeChannelMonetizationChecker from "../screens/Tools/YouTubeChannelMonetizationChecker";
import AIThumbnailsCloner from "../screens/Tools/AIThumbnailsCloner";
import YouTubeMetaDataGenerator from "../screens/Tools/YouTubeMetaDataGenerator";
import YouTubeHashtagGenerator from "../screens/Tools/YouTubeHashtagGenerator";
import YouTubeTagGenerator from "../screens/Tools/YouTubeTagGenerator";
import YouTubeEmbedCodeGenerator from "../screens/Tools/YouTubeEmbedCodeGenerator";
import YouTubeChannelIDFinder from "../screens/Tools/YouTubeChannelIDFinder";
import YoutubeTagExtractor from "../screens/Tools/YoutubeTagExtractor";
import YouTubeTitleExtractor from "../screens/Tools/YouTubeTitleExtractor";
import YouTubeDescriptionExtractor from "../screens/Tools/YouTubeDescriptionExtractor";
import YouTubeTimestampLinkGenerator from "../screens/Tools/YouTubeTimestampLinkGenerator";
import YoutubeVideoCountChecker from "../screens/Tools/YoutubeVideoCountChecker";
import YouTubeChannelAgeChecker from "../screens/Tools/YouTubeChannelAgeChecker";
import YoutubeCommentPicker from "../screens/Tools/YoutubeCommentPicker";
import YouTubeMoneyCalculator from "../screens/Tools/YouTubeMoneyCalculator";
import CaseConvertor from "../screens/Tools/CaseConvertor";
import CreateChannelLogo from "../screens/Services/CreateChannelLogo";
import CreateThumbnails from "../screens/Services/CreateThumbnails";
import CreateBanner from "../screens/Services/CreateBanner";
import YouTubeChannelCustomization from "../screens/Services/YouTubeChannelCustomization";
import YoutubeChannelMonetization from "../screens/Services/YoutubeChannelMonetization";

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
        drawerContent={(props) => <CustomDrawerContent {...props} />}
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
        <Stack.Screen
          name="AI Social Media Cloner"
          component={AISocialMediaCloner}
        />
        <Stack.Screen
          name="AI Youtube Video Cloner"
          component={AIYoutubeVideoCloner}
        />
        <Stack.Screen
          name="AI Local Video Cloner"
          component={AILocalVideoCloner}
        />
        <Stack.Screen name="AI Text To Speech" component={AITextToSpeech} />
        <Stack.Screen
          name="YouTube Video Statistics"
          component={YouTubeVideoStatistics}
        />
        <Stack.Screen
          name="YouTube Channel Statistics"
          component={YouTubeChannelStatistics}
        />
        <Stack.Screen
          name="YouTube Channel Monetization Checker"
          component={YouTubeChannelMonetizationChecker}
        />
        <Stack.Screen
          name="AI Thumbnails Cloner"
          component={AIThumbnailsCloner}
        />
        <Stack.Screen
          name="YouTube Meta Data Generator"
          component={YouTubeMetaDataGenerator}
        />
        <Stack.Screen
          name="YouTube Hashtag Generator"
          component={YouTubeHashtagGenerator}
        />
        <Stack.Screen
          name="YouTube Tag Generator"
          component={YouTubeTagGenerator}
        />
        <Stack.Screen
          name="YouTube Embed Code Generator"
          component={YouTubeEmbedCodeGenerator}
        />
        <Stack.Screen
          name="YouTube Channel ID Finder"
          component={YouTubeChannelIDFinder}
        />
        <Stack.Screen
          name="Youtube Tag Extractor"
          component={YoutubeTagExtractor}
        />
        <Stack.Screen
          name="YouTube Title Extractor"
          component={YouTubeTitleExtractor}
        />
        <Stack.Screen
          name="YouTube Description Extractor"
          component={YouTubeDescriptionExtractor}
        />
        <Stack.Screen
          name="YouTube Timestamp Link Generator"
          component={YouTubeTimestampLinkGenerator}
        />
        <Stack.Screen
          name="Youtube Video Count Checker"
          component={YoutubeVideoCountChecker}
        />
        <Stack.Screen
          name="YouTube Channel Age Checker"
          component={YouTubeChannelAgeChecker}
        />
        <Stack.Screen
          name="Youtube Comment Picker"
          component={YoutubeCommentPicker}
        />
        <Stack.Screen
          name="YouTube Money Calculator"
          component={YouTubeMoneyCalculator}
        />
        <Stack.Screen name="Case Convertor" component={CaseConvertor} />
        <Stack.Screen
          name="Create Youtube Channel"
          component={CreateYoutubeChannel}
        />
        <Stack.Screen
          name="Create Channel Logo"
          component={CreateChannelLogo}
        />
        <Stack.Screen name="Create Thumbnails" component={CreateThumbnails} />
        <Stack.Screen name="Create Banner" component={CreateBanner} />
        <Stack.Screen
          name="YouTube Channel Customization"
          component={YouTubeChannelCustomization}
        />
        <Stack.Screen
          name="Youtube Channel Monetization"
          component={YoutubeChannelMonetization}
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
