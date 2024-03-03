import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";

function editCred() {
  //todo: create a verification that they will change it
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ID: {id}</Text>
      <TouchableHighlight>
        <Text onPress={() => router.replace("/passwords")}>Back</Text>
      </TouchableHighlight>
    </View>
  );
}

export default editCred;
