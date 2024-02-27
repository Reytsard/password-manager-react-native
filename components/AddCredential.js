import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddCredential() {
  return (
    <View style={styles.modal}>
      <Text>Add Credentials</Text>
      <TextInput placeholder="Name" />
      <TextInput placeholder="Username" />
      <TextInput secureTextEntry placeholder="Password" />
      <View>
        <TouchableOpacity>
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
