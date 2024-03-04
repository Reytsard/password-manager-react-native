import { router, useLocalSearchParams } from "expo-router";
import { openDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

const db = openDatabase("Credentials.db");

function editCred() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useLocalSearchParams();
  //todo: create a verification that they will change it

  useEffect(() => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM Credentials WHERE id = (?)",
        [id],
        (_, result) => {
          const data = result.rows._array[0];
          setName(data.name);
          setUsername(data.email);
          setPassword(data.password);
        }
      )
    );
  }, []);
  return (
    <View>
      <Text>ID: {id}</Text>
      <TextInput value={name} onChangeText={(e) => setName(e)} />
      <Text>Email/Username:</Text>
      <TextInput value={username} onChangeText={(e) => setUsername(e)} />
      <Text>Password:{password}</Text>
      <TextInput value={password} onChangeText={(e) => setPassword(e)} />

      <TouchableHighlight>
        <Text onPress={() => router.replace("/passwords")}>Back</Text>
      </TouchableHighlight>
    </View>
  );

  //!!!!!!!!!!!!!!!!!!!!!!!! TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //create a function that will show a modal that will ask if they want to change
}

export default editCred;
