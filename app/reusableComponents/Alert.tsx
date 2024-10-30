import React, { useEffect, useRef } from "react";
import { View, Text, Modal, Animated } from "react-native";

// Interface to avoid typescript error
interface AlertProps {
  isVisible: boolean;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ isVisible, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Trigger animation based on visibility
  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Full screen background and opacity */}
      <View className="flex-1 justify-center items-center">
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
          className="absolute inset-0 bg-black bg-opacity-50"
        />

        {/* Popup Alert */}
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
          className="bg-white rounded-lg p-6 w-80 shadow-lg"
        >
          <Text className="text-lg font-semibold mb-4 text-center">
            Item Added to Cart!
          </Text>
          <Text className="text-gray-600 text-center">
            Your item has been successfully added to the cart.
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Alert;
