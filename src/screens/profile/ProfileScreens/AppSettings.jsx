import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Switch, List, Divider, Text, IconButton } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppSettings = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const fetchNotificationPreference = async () => {
      const savedPreference = await AsyncStorage.getItem("notificationsEnabled");
      setNotificationsEnabled(savedPreference === "true");
    };

    fetchNotificationPreference();
  }, []);

  const toggleNotifications = async () => {
    const newPreference = !notificationsEnabled;
    setNotificationsEnabled(newPreference);
    await AsyncStorage.setItem("notificationsEnabled", newPreference.toString());

    if (newPreference) {
      PushNotification.localNotification({
        title: "Notificações Ativadas",
        message: "Você ativou as notificações do aplicativo.",
      });
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  return (
    <LinearGradient
      colors={["#81E0DD", "#FAFAFA", "#F5F5F5", "#fff"]}
      style={styles.container}
    >
      <IconButton
        icon="arrow-left"
        size={30}
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
        color="#000000"
      />
      <Text style={styles.header}>App Settings</Text>

      <List.Section>
        <List.Item
          title="Notifications"
          description="Enable notifications"
          titleStyle={{ color: "#000000" }}
          descriptionStyle={{ color: "#000000" }}
          left={() => <List.Icon icon="bell" color="#000000" />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              color="#81E0DD"
            />
          )}
        />
        <Divider />
        <List.Item
          title="Privacy Policy"
          description="View privacy policy"
          titleStyle={{ color: "#000000" }}
          descriptionStyle={{ color: "#000000" }}
          left={() => <List.Icon icon="shield-lock" color="#000000" />}
          onPress={() => navigation.navigate("Privacy")}
        />
        <Divider />
        <List.Item
          title="Terms and Conditions"
          description="View terms and conditions"
          titleStyle={{ color: "#000000" }}
          descriptionStyle={{ color: "#000000" }}
          left={() => <List.Icon icon="file-document-outline" color="#000000" />}
          onPress={() => navigation.navigate("Terms")}
        />
      </List.Section>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 10,
  },
});

export default AppSettings;
