//TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AddJobScreen from "../screens/AddJobScreen";
import BrowseJobsScreen from "../screens/BrowseJobsScreen";
import CurrentJobsScreen from "../screens/CurrentJobsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#20aae4",
        tabBarInactiveTintColor: "#777",


        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },

        
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
        },

        
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Add") iconName = "sparkles-outline";
          if (route.name === "Browse") iconName = "search-outline";
          if (route.name === "Current") iconName = "trending-up-outline";

          return <Ionicons name={iconName} size={23} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Add" component={AddJobScreen} />
      <Tab.Screen name="Browse" component={BrowseJobsScreen} />
      <Tab.Screen name="Current" component={CurrentJobsScreen} />
    </Tab.Navigator>
  );
}