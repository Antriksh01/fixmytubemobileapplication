import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Progress from "react-native-progress";
import * as Sharing from "expo-sharing";

const AIYoutubeVideoCloner = () => {
  const [inputValue, setInputValue] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState("");

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+&v=|shorts\/)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setVideoData(null);
    const videoId = extractVideoId(inputValue);

    if (!videoId) {
      Alert.alert("Error", "Invalid YouTube URL. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const options = {
        method: "GET",
        url: "https://ytstream-download-youtube-videos.p.rapidapi.com/dl",
        params: { id: videoId },
        headers: {
          "x-rapidapi-key":
            "450fb1badcmsh09b0e8dd6502861p189847jsne572f5a074ed",
          "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setVideoData(response.data);
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

    const media = videoData.formats.find(
      (item) => item.quality === selectedQuality
    );

    if (media) {
      try {
        setIsDownloading(true);
        setDownloadProgress(0);

        const fileUri = `${FileSystem.documentDirectory}${
          videoData.title || "video"
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
        Alert.alert("Error", "Failed to download the video.");
        setIsDownloading(false);
      }
    } else {
      Alert.alert("Error", "Selected quality not available.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>YouTube Video Downloader</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter YouTube Video URL"
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
            <Text style={styles.buttonText}>Fetch Video</Text>
          )}
        </TouchableOpacity>
      </View>

      {videoData && (
        <View style={styles.resultContainer}>
          <Image
            source={{ uri: videoData.thumbnail[4]?.url }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
          <Text style={styles.resultTitle}>{videoData.title}</Text>
          <Text style={styles.resultDescription}>{videoData.description}</Text>

          <Text style={styles.selectText}>Select Video Quality:</Text>
          <View style={styles.qualityContainer}>
            {videoData.formats?.map((format, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.qualityButton,
                  selectedQuality === format.quality && styles.selectedQuality,
                ]}
                onPress={() => setSelectedQuality(format.quality)}
              >
                <Text
                  style={[
                    styles.qualityText,
                    selectedQuality === format.quality &&
                      styles.selectedQualityText,
                  ]}
                >
                  {format.quality}
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
  resultDescription: {
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
});

export default AIYoutubeVideoCloner;
