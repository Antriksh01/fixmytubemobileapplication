import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Progress from "react-native-progress";

const AILocalVideoCloner = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const maxSize = 100 * 1024 * 1024; // 100 MB

  const handleFilePick = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true, // Ensures the file is copied to the cache directory
      });

      if (!file || file.type === "cancel") {
        Alert.alert("No File Selected", "Please select a file to upload.");
        return;
      }

      if (!file.uri) {
        Alert.alert("Error", "Invalid file URI.");
        return;
      }

      if (file.size > maxSize) {
        setErrorMessage(
          "File size exceeds 100 MB. Please upload a smaller file."
        );
        setDownloadLink(null);
        return;
      }

      console.log("Selected File:", file); // Debugging information

      setSelectedFile(file);
      setErrorMessage(""); // Clear any previous errors
      handleFileUpload(file);
    } catch (error) {
      console.error("File Picker Error:", error);
      Alert.alert("Error", "Failed to pick a file. Please try again.");
    }
  };

  const handleFileUpload = async (file) => {
    try {
      if (!file || !file.uri) {
        Alert.alert("Error", "Invalid file URI.");
        return;
      }

      const uploadUri = file.uri;
      const newFileName = `processed_${file.name || "video"}.mp4`;
      const newFileUri = `${FileSystem.documentDirectory}${newFileName}`;

      console.log("Upload URI:", uploadUri);
      console.log("New File URI:", newFileUri);

      const fileInfo = await FileSystem.getInfoAsync(uploadUri);
      console.log("File Info:", fileInfo); // Debugging information

      if (!fileInfo.exists) {
        throw new Error("File does not exist at the provided URI.");
      }

      setIsProcessing(true);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(prev + 10, 100);
        });
      }, 500);

      // Handle content:// URIs (Android) and file:// URIs (iOS or local files)
      if (
        uploadUri.startsWith("content://") ||
        uploadUri.startsWith("file://")
      ) {
        await FileSystem.copyAsync({
          from: uploadUri,
          to: newFileUri,
        });
        setDownloadLink(newFileUri);
      } else {
        throw new Error("Unsupported URI format.");
      }

      setIsProcessing(false);
      Alert.alert("Success", "File processed successfully!");
    } catch (error) {
      console.error("File Upload Error:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to upload and process the file."
      );
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!downloadLink) {
      Alert.alert("Error", "No file to download.");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Cannot save video without permission.");
      return;
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(downloadLink);
      await MediaLibrary.createAlbumAsync("AI Cloned Videos", asset, false);
      Alert.alert("Success", "Video saved to your gallery!");
    } catch (error) {
      console.error("File Download Error:", error);
      Alert.alert("Error", "Failed to save video.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Local Video Cloner</Text>
      <Text style={styles.subtitle}>
        Upload a video file, and we’ll clone it for you! The file size must be
        less than 100 MB.
      </Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
        <Text style={styles.uploadButtonText}>
          {selectedFile ? "Change File" : "Upload Video"}
        </Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={styles.fileName}>Selected File: {selectedFile.name}</Text>
      )}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {isProcessing && (
        <View style={styles.progressContainer}>
          <Text style={styles.processingText}>
            Processing File... Please wait.
          </Text>
          <Progress.Bar
            progress={uploadProgress / 100}
            width={200}
            color="#4caf50"
          />
          <Text style={styles.progressText}>{Math.round(uploadProgress)}%</Text>
        </View>
      )}

      {downloadLink && !isProcessing && (
        <View style={styles.downloadContainer}>
          <Text style={styles.successText}>
            Your video is ready for download!
          </Text>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadButtonText}>
              Download Processed Video
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fileName: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  processingText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  downloadContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  successText: {
    fontSize: 16,
    color: "#4caf50",
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AILocalVideoCloner;
