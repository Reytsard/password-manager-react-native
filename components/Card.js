import { openDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";

const db = SQLite.openDatabase("Credentials.db");

function Card({ card, removeCreds, isDarkMode }) {
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
    <View key={card.id} style={!isDarkMode ? styles.card : styles.darkCard}>
      <View style={!isDarkMode ? styles.creds : styles.darkCreds}>
        <Text style={!isDarkMode ? styles.textTitle : styles.darkTextTitle}>
          {card.name}
        </Text>
        <Text style={!isDarkMode ? { color: "black" } : { color: "white" }}>
          Username: {card.email}
        </Text>
        <Text style={!isDarkMode ? { color: "black" } : { color: "white" }}>
          Password: {card.password}
        </Text>
      </View>
      <View style={styles.cardOptions}>
        <TouchableHighlight
          style={!isDarkMode ? styles.cardOption : styles.darkcardOption}
          onPress={() => editHandler(card.id)}
        >
          <Text style={!isDarkMode ? { color: "black" } : { color: "white" }}>
            Edit
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={!isDarkMode ? styles.cardOption : styles.darkcardOption}
          onPress={removeCardHandler}
        >
          <Text style={!isDarkMode ? { color: "black" } : { color: "white" }}>
            Remove
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  textTitle: { fontSize: 24, fontWeight: "800", color: "black" },
  darkTextTitle: { fontSize: 24, fontWeight: "800", color: "white" },
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
  darkCard: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderColor: "white",
  },
  creds: { display: "flex", flexDirection: "column", gap: 5 },
  darkCreds: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    color: "white",
  },
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
    // backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: "white",
  },
  darkcardOption: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 65,
    backgroundColor: "black",
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
});
