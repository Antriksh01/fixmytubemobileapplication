import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const UserWallet = ({ walletRefCost }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState([]);
  const [formData, setFormData] = useState({
    bank_name: "",
    bank_account_number: "",
    ifsc_code: "",
    upi_id: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getWalletBalance = async () => {
    try {
      const { data } = await axios.get(
        `https://fixmytube.com/api/v1/user/getWalletBalanceByUser/${user.LoginID}`
      );
      setWalletBalance(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletBalance();
  }, []);

  const walletTransactionData = {
    userId: user.LoginID,
    userName: user.Name,
    userEmail: user.EmailAddress,
    type: "credit",
    amount: walletBalance[0]?.balance,
    description: "user registeration by referral",
    bank_name: formData.bank_name,
    bank_account_number: formData.bank_account_number,
    ifsc_code: formData.ifsc_code,
    upi_id: formData.upi_id,
  };

  const walletBalanceHandler = async (amount) => {
    try {
      await axios.post(
        `https://fixmytube.com/api/v1/user/walletHandler/${user.LoginID}`,
        {
          email: user?.EmailAddress,
          balance:
            Number(walletBalance[0]?.balance) >=
            Number(walletRefCost[0]?.min_withdrawal_limit)
              ? 0
              : walletBalance[0]?.balance,
        }
      );
      setShowPopup(false);
      setPaymentMethod("");
      setFormData({
        bank_name: "",
        bank_account_number: "",
        ifsc_code: "",
        upi_id: "",
      });
      getWalletBalance();
      Alert.alert("Success", "Withdrawal request submitted");
    } catch (error) {
      console.log(error);
    }
  };

  const walletTransactionHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://fixmytube.com/api/v1/user/walletTransaction",
        walletTransactionData
      );
      setLoading(false);
      await walletBalanceHandler(res?.data?.data?.amount);
    } catch (error) {
      console.log(error?.response);
      Alert.alert("Error", "An error occurred while processing your request.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your Wallet Balance</Text>
        <Text style={styles.balance}>
          ₹{walletBalance?.length === 0 ? 0 : walletBalance[0]?.balance}
        </Text>
        {walletBalance.length === 0 ||
        Number(walletBalance[0]?.balance) <
          Number(walletRefCost[0]?.min_withdrawal_limit) ? (
          <TouchableOpacity style={styles.buttonDisabled} disabled>
            <Text style={styles.buttonText}>Request Withdrawal</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowPopup(true)}
          >
            <Text style={styles.buttonText}>Request Withdrawal</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.note}>
          Note: Minimum withdrawal amount is{" "}
          {walletRefCost[0]?.min_withdrawal_limit}
        </Text>
      </View>

      <Modal visible={showPopup} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Withdrawal Method</Text>
            <View style={styles.methodContainer}>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  paymentMethod === "bank" && styles.methodButtonSelected,
                ]}
                onPress={() => setPaymentMethod("bank")}
              >
                <Text
                  style={[
                    styles.methodText,
                    paymentMethod === "bank" && styles.methodTextSelected,
                  ]}
                >
                  Bank
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  paymentMethod === "upi" && styles.methodButtonSelected,
                ]}
                onPress={() => setPaymentMethod("upi")}
              >
                <Text
                  style={[
                    styles.methodText,
                    paymentMethod === "upi" && styles.methodTextSelected,
                  ]}
                >
                  UPI
                </Text>
              </TouchableOpacity>
            </View>

            {paymentMethod === "bank" && (
              <View>
                <TextInput
                  placeholder="Bank Name"
                  value={formData.bank_name}
                  onChangeText={(value) =>
                    handleInputChange("bank_name", value)
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="Account Number"
                  value={formData.bank_account_number}
                  onChangeText={(value) =>
                    handleInputChange("bank_account_number", value)
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="IFSC Code"
                  value={formData.ifsc_code}
                  onChangeText={(value) =>
                    handleInputChange("ifsc_code", value)
                  }
                  style={styles.input}
                />
              </View>
            )}

            {paymentMethod === "upi" && (
              <View>
                <TextInput
                  placeholder="UPI ID"
                  value={formData.upi_id}
                  onChangeText={(value) => handleInputChange("upi_id", value)}
                  style={styles.input}
                />
              </View>
            )}

            {paymentMethod && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={walletTransactionHandler}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  button: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  note: { fontSize: 12, textAlign: "center", marginTop: 10 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: { fontSize: 18, color: "#888" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  methodContainer: { flexDirection: "row", justifyContent: "space-around" },
  methodButton: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    alignItems: "center",
  },
  methodButtonSelected: { backgroundColor: "#2196f3" },
  methodText: { color: "#000" },
  methodTextSelected: { color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  submitButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: { color: "#fff", fontWeight: "bold" },
});

export default UserWallet;
