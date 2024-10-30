import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

interface AlertProps {
  visible: boolean;
  code: string;
  onClose: () => void;
}

const LoginSignUpAlert: React.FC<AlertProps> = ({
  visible,
  code,
  onClose,
}) => {

  let errorMessage = '';

  // Handele error using switch
  switch (code) {
    case "auth/user-not-found":
      errorMessage = "No user found with this email.";
      break;
    case "auth/wrong-password":
      errorMessage = "Email or password is incorrect";
      break;
    case "auth/invalid-email":
      errorMessage = "Invalid email or password.";
      break;
    case "auth/invalid-credential":
      errorMessage = "Invalid email or password.";
      break;
    case "auth/user-disabled":
      errorMessage = "This user has been disabled.";
      break;
    case "auth/too-many-requests":
      errorMessage = "Too many login attempts. Please try again later.";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "Email/password authentication is not enabled.";
      break;
    case "auth/network-request-failed":
      errorMessage = "Network error. Please check your connection.";
      break;
    default:
      errorMessage = "An unexpected error occurred.";
  }

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertMessage}>{errorMessage}</Text>
          <Button title="OK" onPress={onClose} color="#ff4757" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  alertMessage: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
});

export default LoginSignUpAlert;
