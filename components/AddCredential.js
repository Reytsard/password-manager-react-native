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
  return (
    <View style={styles.modal}>
      <Text>Add Credentials</Text>
      <TextInput
        placeholder="Name"
        onChangeText={(e) => setName(e)}
        value={name}
      />
      <TextInput
        placeholder="Username"
        onChangeText={(e) => setEmail(e)}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={(e) => setPassword(e)}
        value={password}
      />
      <View>
        <TouchableOpacity onPress={addCredential}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
});
