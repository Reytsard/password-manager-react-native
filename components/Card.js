import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

function Card({ card, removeCreds }) {
  //todo create those touchable to route to another place
  return (
    <View key={card.id} style={styles.card}>
      <View style={styles.creds}>
        <Text style={styles.textTitle}>{card.name}</Text>
        <Text>Email: {card.email}</Text>
        <Text>Password: {card.password}</Text>
      </View>
      <View style={styles.cardOptions}>
        <TouchableHighlight style={styles.cardOption}>
          <Text>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.cardOption} onPress={removeCreds}>
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
    backgroundColor: "gray",
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
