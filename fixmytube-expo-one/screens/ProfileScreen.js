import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearUser } from "../redux/user/userSlice";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import UserWallet from "../components/UserWallet";

const ProfileScreen = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  console.log(user);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [recData, setRecData] = useState([]);
  const [subsPlan, setSubsPlan] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [subsPlanAmount, setSubsPlanAmount] = useState("");
  const [walletRefCost, setWalletRefCost] = useState([]);
  const [walletBalance, setWalletBalance] = useState([]);
  const [referredUser, setReferredUser] = useState([]);
  const [withdrawList, setWithdrawList] = useState([]);
  const [plans, setPlans] = useState(["Basic", "Advanced"]);

  const handleLogout = () => {
    // Alert.alert("session timeout! Login Again");
    dispatch(clearUser());
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `https://fixmytube.com/api/v1/user/getUserDetails/${user.LoginID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserData(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        if (
          errorMessage === "Unauthorized - Token expired" ||
          errorMessage === "Unauthorized - Invalid token"
        ) {
          handleLogout();
        } else {
          console.log("Unauthorized access:", errorMessage);
        }
      } else {
        console.log("An error occurred:", error.message);
      }
    }
  };

  const getReceiptsDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://fixmytube.com/api/v1/user/getPaymentReceiptByEmail/${user?.EmailAddress}`
      );
      setRecData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getReceiptsDetails();
  }, []);

  const generateReferCode = async (id) => {
    try {
      const res = await axios.put(
        `https://fixmytube.com/api/v1/user/generateReferCode/${id}`
      );
      getUserData();
      cogoToast.success("referral code generated successfully");
    } catch (error) {
      console.log(error);
    }
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

  const walletReferralCharge = async () => {
    try {
      const { data } = await axios.get(
        "https://fixmytube.com/api/v1/user/walletLimitDetails"
      );
      setWalletRefCost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReferredUser = async () => {
    try {
      const { data } = await axios.get(
        `https://fixmytube.com/api/v1/user/ReferredUserList/${user?.LoginID}`
      );
      setReferredUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletBalance();
    walletReferralCharge();
    getReferredUser();
  }, [user]);

  const handleCopyReferralLink = (referralCode) => {
    const referralLink = referralCode
      ? `https://fixmytube.com/pricing/${referralCode}`
      : "";

    if (referralLink) {
      Clipboard.setStringAsync(referralLink)
        .then(() => {
          Alert.alert("Success", "Referral link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy the referral link: ", err);
          Alert.alert("Error", "Failed to copy the referral link.");
        });
    }
  };

  const getWithdrawalListData = async () => {
    try {
      const { data } = await axios.get(
        `https://fixmytube.com/api/v1/user/walletWithdrawalById/${user?.LoginID}`
      );
      setWithdrawList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWithdrawalListData();
  }, []);

  console.log(withdrawList);

  const totalAmount = withdrawList.reduce((sum, item) => sum + item.amount, 0);

  const pendingAmount = withdrawList
    .filter((item) => item.status !== "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const paidAmount = withdrawList
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Subscription Section */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.generateButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.subscriptionContainer}>
        <Text style={styles.subscriptionTitle}>Subscription</Text>
        <Text style={styles.subscriptionPlan}>{userData[0]?.Membership}</Text>
        <Text style={styles.planEndDate}>
          Plan Ends On : {userData[0]?.MembershipExpiryDate?.split(" ")[0]}
        </Text>
        <TouchableOpacity
          style={styles.renewButton}
          onPress={() => Linking.openURL("https://fixmytube.com/")}
        >
          <Text style={styles.renewButtonText}>Renew Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Wallet Balance */}
      <View style={styles.walletContainer}>
        <UserWallet
          walletBalance={walletBalance}
          walletRefCost={walletRefCost}
        />
        {/* <Text style={styles.walletTitle}>Your Wallet Balance</Text>
        <Text style={styles.walletAmount}>
          ₹{walletBalance?.length === 0 ? 0 : walletBalance[0]?.balance}
        </Text> */}
        {/* <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>Request Withdrawal</Text>
        </TouchableOpacity>
        <Text style={styles.walletNote}>
          Note: Minimum withdrawal amount is 1000
        </Text> */}
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.profileText}>User ID: {userData[0]?.LoginID}</Text>
        <Text style={styles.profileText}>Full Name: {userData[0]?.Name}</Text>
        <Text style={styles.profileText}>
          Email: {userData[0]?.EmailAddress}
        </Text>
        <Text style={styles.profileText}>
          YouTube Channel: {userData[0]?.channel_name}
        </Text>
        <Text style={styles.profileText}>
          YouTube Channel URL:{" "}
          <TouchableOpacity
            onPress={() => Linking.openURL(userData[0]?.channel_link)}
          >
            <Text style={styles.registerLink}>{userData[0]?.channel_name}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.profileText}>
          Facebook URL:{" "}
          <TouchableOpacity
            onPress={() => Linking.openURL(userData[0]?.facebook)}
          >
            <Text style={styles.registerLink}>{userData[0]?.facebook}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.profileText}>
          Instagram URL:{" "}
          <TouchableOpacity
            onPress={() => Linking.openURL(userData[0]?.instagram)}
          >
            <Text style={styles.registerLink}>{userData[0]?.instagram}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.profileText}>
          Twitter:{" "}
          <TouchableOpacity
            onPress={() => Linking.openURL(userData[0]?.twitter)}
          >
            <Text style={styles.registerLink}>{userData[0]?.twitter}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.profileText}>
          Referral Code: {userData[0]?.referral_code}
        </Text>
        <Text style={styles.profileText}>
          Referral Link:{" "}
          {userData[0]?.referral_code === null
            ? ""
            : `https://fixmytube.com/pricing/${userData[0]?.referral_code}`}
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => handleCopyReferralLink(userData[0]?.referral_code)}
          >
            <Text style={styles.generateButtonText}>Copy</Text>
          </TouchableOpacity>
        </Text>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => generateReferCode(user.LoginID)}
        >
          <Text style={styles.generateButtonText}>Generate Referral Code</Text>
        </TouchableOpacity>
      </View>

      {/* Billing History */}
      <View style={styles.billingContainer}>
        <Text style={styles.sectionTitle}>Billing History</Text>
        {recData && recData.length > 0 ? (
          <ScrollView horizontal>
            <View>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.cell, styles.headerCell]}>
                  Invoice Number
                </Text>
                <Text style={[styles.cell, styles.headerCell]}>Date</Text>
                <Text style={[styles.cell, styles.headerCell]}>Status</Text>
                <Text style={[styles.cell, styles.headerCell]}>
                  View Receipt
                </Text>
              </View>

              {/* Table Body */}
              <ScrollView style={{ maxHeight: 400 }}>
                {recData.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                    ]}
                  >
                    <Text style={styles.cell}>{item.order_id}</Text>
                    <Text style={styles.cell}>
                      {item.created_at?.split(" ")[0]}
                    </Text>

                    <Text style={styles.cell}>{item.status}</Text>
                    <TouchableOpacity>
                      <Text style={[styles.cell, styles.linkText]}>
                        Click to view
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.placeholderText}>
            No billing history available
          </Text>
        )}
        {/* <Text style={styles.placeholderText}>No billing history available</Text> */}
      </View>

      {/* Referred User List */}
      <View style={styles.referralContainer}>
        <Text style={styles.sectionTitle}>Referred User List</Text>
        {recData && recData.length > 0 ? (
          <ScrollView horizontal>
            <View>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.cell, styles.headerCell]}>User ID</Text>
                <Text style={[styles.cell, styles.headerCell]}>
                  Referred By
                </Text>
                <Text style={[styles.cell, styles.headerCell]}>Status</Text>
                <Text style={[styles.cell, styles.headerCell]}>Added Date</Text>
              </View>

              {/* Table Body */}
              <ScrollView style={{ maxHeight: 400 }}>
                {referredUser.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                    ]}
                  >
                    <Text style={styles.cell}>{item.LoginID}</Text>
                    <Text style={styles.cell}>{item.referred_by}</Text>
                    <Text style={styles.cell}>{item.ApprovalStatus}</Text>
                    <Text style={styles.cell}>
                      {item.AddedDate?.split(" ")[0]}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.placeholderText}>
            No Referred User Data available
          </Text>
        )}
      </View>

      {/* Wallet Withdrawal List */}
      <View style={styles.withdrawalContainer}>
        <Text style={styles.sectionTitle}>Wallet Withdrawal List</Text>
        {withdrawList && withdrawList.length > 0 ? (
          <ScrollView horizontal>
            <View>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                {/* <Text style={[styles.cell, styles.headerCell]}>User ID</Text> */}
                <Text style={[styles.cell, styles.headerCell]}>Amount</Text>
                <Text style={[styles.cell, styles.headerCell]}>
                  Bank Account
                </Text>
                <Text style={[styles.cell, styles.headerCell]}>UPI ID</Text>
                <Text style={[styles.cell, styles.headerCell]}>Status</Text>
              </View>

              {/* Table Body */}
              <ScrollView style={{ maxHeight: 400 }}>
                {withdrawList.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                    ]}
                  >
                    {/* <Text style={styles.cell}>{item.user_id}</Text> */}
                    <Text style={styles.cell}>{item.amount}</Text>
                    <Text style={styles.cell}>{item.bank_account}</Text>
                    <Text style={styles.cell}>{item.upi_id}</Text>
                    <Text style={styles.cell}>
                      {item.status !== "Paid" ? "Pending" : item.status}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.placeholderText}>
            No Wallet Withdraw History Available
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 100,
  },
  subscriptionContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subscriptionPlan: {
    fontSize: 14,
    marginVertical: 5,
  },
  planEndDate: {
    fontSize: 12,
    color: "gray",
  },
  renewButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  renewButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  walletContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  walletAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  withdrawButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  withdrawButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  walletNote: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  profileContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileText: {
    fontSize: 14,
    marginVertical: 2,
  },
  generateButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  generateButtonText: {
    color: "#fff",
    textAlign: "center",
  },

  referralContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  withdrawalContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  registerLink: {
    color: "#ff3f34",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },

  billingContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f1f8ff",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  rowEven: {
    backgroundColor: "#fff",
  },
  rowOdd: {
    backgroundColor: "#f9f9f9",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 100, // Ensures each column has a minimum width for horizontal scrolling
  },
  headerCell: {
    fontWeight: "bold",
  },
  linkText: {
    color: "skyblue",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
