import { Alert, StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem, Icon, Switch, Button } from "@rneui/themed";
import { useSettings } from "../contexts/SettingsContext";
import storage from "../lib/storage";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "../store/authStore";

function ProfileScreen() {
  const { preferences, setPreferences } = useSettings();
  const logout = useAuthStore((state) => state.logout);
  
  const handleChangeShowDone = async (value) => {
    await storage.save({
      key: "preferences",
      data: { ...preferences, showTodoDone: value },
    });
    setPreferences({ ...preferences, showTodoDone: value });
  };
  const handleChangeImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(true);

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      await storage.save({
        key: "preferences",
        data: { ...preferences, imageFile: result.assets[0].uri },
      });
      setPreferences({ ...preferences, imageFile: result.assets[0].uri });
    }
  };
  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={{ backgroundColor: "gray" }}
        rounded
        size={150}
        icon={
          !preferences.imageFile
            ? { type: "ionicon", name: "person", color: "whitesmoke" }
            : undefined
        }
        source={
          preferences.imageFile ? { uri: preferences.imageFile } : undefined
        }
      >
        <Avatar.Accessory
          rounded
          size={40}
          backgroundColor="orange"
          containerStyle={{ borderRadius: 40 }}
          name="pencil"
          type="ionicon"
          onPress={handleChangeImage}
        />
      </Avatar>

      <View style={styles.list}>
        <ListItem bottomDivider>
          <Icon type="ionicon" name="settings" />
          <ListItem.Content>
            <ListItem.Title>
              <Text>Afficher les todos terminées</Text>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <Switch
              value={preferences.showTodoDone}
              onValueChange={handleChangeShowDone}
            />
          </ListItem.Content>
        </ListItem>
      </View>
      <Button title="Se déconnecter" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: { width: 430, padding: 20 },
});

export default ProfileScreen;
