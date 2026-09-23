import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TodosNavigator from "./TodosNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import IonIcons from "@react-native-vector-icons/ionicons";
import UsersListScreen from "../screens/UsersListScreen";

const Tab = createMaterialTopTabNavigator();

function MainNavigator() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Todos"
          tabBarPosition="bottom"
          screenOptions={{ lazy: true }}
        >
          <Tab.Screen
            name="Todos"
            component={TodosNavigator}
            options={{
              tabBarLabel: "Liste",
              tabBarIcon: ({ focused }) => (
                // <Image source={require('./favicon.png')} width={10} height={10}/>
                <IonIcons
                  name="list-sharp"
                  size={24}
                  color={focused ? "orange" : "black"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="UsersList"
            component={UsersListScreen}
            options={{
              tabBarLabel: "Users",
              tabBarIcon: ({ focused }) => (
                <IonIcons
                  name="people-sharp"
                  size={24}
                  color={focused ? "orange" : "black"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Moi",
              tabBarIcon: ({ focused }) => (
                <IonIcons
                  name="person-sharp"
                  size={24}
                  color={focused ? "orange" : "black"}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});

export default MainNavigator;
