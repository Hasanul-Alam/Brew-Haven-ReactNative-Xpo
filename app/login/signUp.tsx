import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    // Add your sign-up logic here (e.g., Firebase Auth)
    // On successful sign-up:
    router.replace('/home'); // Redirect to the homepage after sign-up
  };

  return (
    <View className="flex-1 bg-[#0C0F14] justify-center px-6">
      <Text className="text-3xl text-white font-semibold text-center mb-10">Sign Up</Text>

      <TextInput
        className="bg-[#21262E] text-white px-4 py-3 rounded-lg"
        placeholder="Email"
        placeholderTextColor="#AEAEAE"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        className="bg-[#21262E] text-white px-4 py-3 rounded-lg mt-4"
        placeholder="Password"
        placeholderTextColor="#AEAEAE"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity onPress={handleSignUp} className="bg-[#D17842] py-4 rounded-lg mt-6">
        <Text className="text-white text-center text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-[#AEAEAE] text-sm">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="text-[#D17842] text-sm">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
