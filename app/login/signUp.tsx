import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../providers/AuthProvider";
import { UserCredential } from "firebase/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signup, setUser, setError } = useContext(AuthContext);

  const handleSignUp = async () => {
    try {
      // Type userCredential as UserCredential
      const userCredential: UserCredential = await signup(email, password);

      if (userCredential?.user) {
        setUser(userCredential.user); // userCredential.user now exists with proper type
        console.log("User credential:", userCredential);
        // Redirect to the homepage after successful signup
        router.replace("/home");
      }
    } catch (error: any) {
      // Add 'any' type to error for proper typing
      setError?.(error.message);
      console.log("Error during signup:", error.code, error.message);
    }

    // Logging form input data (for debugging purposes)
    console.log("Name: ", name, "Email: ", email, "Password: ", password);
  };

  // const handleSignUp = () => {
  //   signUp(email, password)
  //     .then((userCredential) => {
  //       setUser(userCredential.user);
  //       if (userCredential.user) {
  //         router.replace("/home");
  //       }
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       setError(error.message);
  //       // ..
  //     });
  //   // All Data From Input Fields
  //   console.log("Name: ", name, "Email: ", email, "Password: ", password);
  //   // Add your sign-up logic here (e.g., Firebase Auth)
  //   // On successful sign-up:
  //   // Redirect to the homepage after sign-up
  // };

  return (
    <View className="flex-1 bg-[#0C0F14] justify-center px-6">
      <Text className="text-3xl text-white font-semibold text-center mb-10">
        Sign Up
      </Text>

      <TextInput
        className="bg-[#21262E] text-white px-4 py-3 rounded-lg"
        placeholder="Enter Name"
        placeholderTextColor="#AEAEAE"
        keyboardType="default"
        autoCapitalize="words"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        className="bg-[#21262E] text-white px-4 py-3 rounded-lg my-2"
        placeholder="Email"
        placeholderTextColor="#AEAEAE"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        className="bg-[#21262E] text-white px-4 py-3 rounded-lg"
        placeholder="Password"
        placeholderTextColor="#AEAEAE"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-[#D17842] py-4 rounded-lg mt-6"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Sign Up
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-[#AEAEAE] text-sm">
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-[#D17842] text-sm">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
