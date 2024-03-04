import { openDatabase } from "expo-sqlite";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";

const db = SQLite.openDatabase("Credentials.db");

function Card({ card, removeCreds }) {
  const deleteTuple = (tupleId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM credentials WHERE id = ?",
        [tupleId],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log("Tuple deleted successfully");
            // You can perform additional actions here if needed
            removeCreds();
          } else {
            console.warn("No rows deleted. Tuple may not have been found.");
          }
        },
        (_, error) => console.error("Error deleting tuple", error)
      );
    });
  };
  const removeCardHandler = () => {
    deleteTuple(card.id);
  };
  //todo create those touchable to route to another place
  const editHandler = (id) => {
    router.replace("/cred/" + id);
  };
  return (
    <View key={card.id} style={styles.card}>
      <View style={styles.creds}>
        <Text style={styles.textTitle}>{card.name}</Text>
        <Text>Username: {card.email}</Text>
        <Text>Password: {card.password}</Text>
      </View>
      <View style={styles.cardOptions}>
        <TouchableHighlight
          style={styles.cardOption}
          onPress={() => editHandler(card.id)}
        >
          <Text>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.cardOption}
          onPress={removeCardHandler}
        >
          <Text>Remove</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  textTitle: { fontSize: 24, fontWeight: "800" },
  card: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creds: { display: "flex", flexDirection: "column", gap: 5 },
  cardOptions: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  cardOption: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 65,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
  },
});
/*
card: {
    display: "flex",
    maxWidth: 920,
    flexDirection: "row",
  },
  cardOptions: {
    display: "flex",
    flexDirection: "row",
  },
  cardOption: {},
  */
