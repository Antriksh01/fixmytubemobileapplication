import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";

const AISocialMediaCloner = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink`,
        { url: inputValue },
        {
          headers: {
            "x-rapidapi-key":
              "195da220camsh0826b8328ea52f8p181ca5jsnce4507430b20",
            "x-rapidapi-host": "social-download-all-in-one.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );
      setResult(data);
      setShowResult(true);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch video details. Please try again.");
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedQuality) {
      Alert.alert("Error", "Please select a video quality.");
      return;
    }

    const media = result.medias.find(
      (item) => item.quality === selectedQuality
    );

    if (media) {
      try {
        setIsDownloading(true);
        setDownloadProgress(0);

        const fileUri = `${FileSystem.documentDirectory}${
          media.title || "video"
        }.mp4`;

        const downloadResumable = FileSystem.createDownloadResumable(
          media.url,
          fileUri,
          {},
          (downloadProgress) => {
            const progress =
              downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite;
            setDownloadProgress(progress);
          }
        );

        const { uri } = await downloadResumable.downloadAsync();
        setIsDownloading(false);

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Cannot save video without permission."
          );
          return;
        }

        await MediaLibrary.createAssetAsync(uri);
        Alert.alert("Success", "Video saved to your gallery!");
      } catch (error) {
        console.error("Error downloading file:", error);
        Alert.alert("Error", "Failed to download the video.");
        setIsDownloading(false);
      }
    } else {
      Alert.alert("Error", "Selected quality not available.");
    }
  };

  const handleLogin = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    setModalVisible(false);
    navigation.navigate("Register");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Social Media Video Cloner</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Video URL"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: inputValue ? "#ff4d4d" : "#ccc" },
          ]}
          onPress={handleGenerate}
          disabled={!inputValue || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Clone Video</Text>
          )}
        </TouchableOpacity>
      </View>

      {showResult && result && (
        <View style={styles.resultContainer}>
          <Image
            source={{ uri: result.thumbnail }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
          <Text style={styles.resultTitle}>{result.title}</Text>
          <Text style={styles.resultAuthor}>Author: {result.author}</Text>

          <Text style={styles.selectText}>Select Video Quality:</Text>
          <View style={styles.qualityContainer}>
            {result.medias
              ?.filter((media) => media.type === "video")
              ?.map((media, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.qualityButton,
                    selectedQuality === media.quality && styles.selectedQuality,
                  ]}
                  onPress={() => setSelectedQuality(media.quality)}
                >
                  <Text
                    style={[
                      styles.qualityText,
                      selectedQuality === media.quality &&
                        styles.selectedQualityText,
                    ]}
                  >
                    {media.quality}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          {isDownloading ? (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Downloading: {(downloadProgress * 100).toFixed(2)}%
              </Text>
              <Progress.Bar
                progress={downloadProgress}
                width={200}
                color="#ff4d4d"
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownload}
            >
              <Text style={styles.downloadButtonText}>Download Video</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.shareContainer}>
        <Text style={styles.shareText}>Share:</Text>
        <TouchableOpacity onPress={() => Sharing.shareAsync(inputValue)}>
          <Text style={styles.shareButton}>WhatsApp</Text>
        </TouchableOpacity>
        {/* Add other sharing options here */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alert!</Text>
            <Text style={styles.modalText}>
              Please login or register to continue using this tool.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLogin}
              >
                <Text style={styles.modalButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleRegister}
              >
                <Text style={styles.modalButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4d4d",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  resultAuthor: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  selectText: {
    fontSize: 14,
    marginBottom: 10,
  },
  qualityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  qualityButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    margin: 5,
  },
  selectedQuality: {
    borderColor: "#ff4d4d",
  },
  qualityText: {
    color: "#333",
  },
  selectedQualityText: {
    color: "#ff4d4d",
  },
  downloadButton: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  downloadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  progressText: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  shareContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  shareText: {
    fontSize: 16,
    marginRight: 10,
  },
  shareButton: {
    color: "#ff4d4d",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AISocialMediaCloner;
