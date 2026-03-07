//browseJobsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BrowseJobsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Jobs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});