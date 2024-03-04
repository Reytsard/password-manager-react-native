import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddCredential(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const addCredential = () => {
    props.handleAddCredentials(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
    props.setIsAddingCredential(false);
  };
  const cancelHandler = () => {
    setName("");
    setEmail("");
    setPassword("");
    props.setIsAddingCredential(false);
  };
  return (
    <View style={styles.modal}>
      <Text style={styles.header}>Add Credentials</Text>
      <TextInput
        placeholder="Name"
        onChangeText={(e) => setName(e)}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        onChangeText={(e) => setEmail(e)}
        value={email}
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={(e) => setPassword(e)}
        value={password}
        style={styles.input}
      />
      <View style={styles.options}>
        <TouchableOpacity onPress={addCredential} style={styles.button}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={cancelHandler} style={styles.button}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    maxHeight: 320,
    maxWidth: 920,
    height: 300,
    width: "100%",
  },
  header: {
    textAlign: "center",
    fontSize: 26,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  options: {
    marginTop: 10,
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    height: 50,
    width: 80,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
});
