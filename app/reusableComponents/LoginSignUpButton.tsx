import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface LoginSignUpButtonProps {
  onPressFunction: () => void; // Function type for the onPress prop
  buttonTitle: string; // String type for the button title
}

const LoginSignUpButton: React.FC<LoginSignUpButtonProps> = ({
  onPressFunction,
  buttonTitle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      className="bg-[#D17842] py-4 rounded-lg mt-6"
    >
      <Text className="text-white text-center text-lg font-semibold">
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginSignUpButton;

const styles = StyleSheet.create({});
