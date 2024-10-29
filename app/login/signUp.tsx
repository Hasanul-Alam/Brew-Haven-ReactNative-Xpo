import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../providers/AuthProvider";
import { UserCredential } from "firebase/auth";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import LoginSignUpButton from "../reusableComponents/LoginSignUpButton";
import useAsyncStorage from "../hooks/useAsyncStorage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { saveData } = useAsyncStorage("user");
  const { signup, setUser, setError, updateUserProfile } =
    useContext(AuthContext);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<any | null>(null);

  // Handle sign up
  const handleSignUp = async () => {
    // Check wheather image is uploaded or not
    if (imageBase64) {
      const imageUrl = await uploadImage(imageBase64);
      // Signing in into firebase after successfully uploaded the image.
      if (imageUrl) {
        signUpToFirebase(name, imageUrl);
      }
      // If image is not uploaded for a reason
      else {
        alert("Image is not uploaded properly.");
      }
    }
    // If the image base64 is not set
    else {
      alert("Please select an image.");
    }
  };

  // Firebase Sign Up
  const signUpToFirebase = async (name: string, imageUrl: string) => {
    setLoading(true);
    try {
      // Type userCredential as UserCredential
      const userCredential: UserCredential = await signup(email, password);

      if (userCredential?.user) {
        // Update User Porfile
        updateUserProfile(name, imageUrl).then(() => {
          // Set user data to state
          setUser(userCredential.user);
          saveData({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            name: name,
            photoURL: imageUrl,
          }); // Set user data to local storage

          setLoading(false); // Set Loading state

          router.replace("/home"); // Redirect to the homepage after successful signup
        });

        console.log(userCredential.user.email, userCredential.user.uid);
      }
    } catch (error: any) {
      // Add 'any' type to error for proper typing
      setError?.(error.message);
      setLoading(false);
      console.log("Error during signup:", error.code, error.message);
    }
  };

  /* Image uploading portion */

  // Imagebb API key
  const API_KEY = "a034eb9194a3961792dc743224e30bd2";

  // Image picking function
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true, // Get the base64 string
      });

      if (!result.canceled) {
        setImageBase64(result.assets[0].base64); // Set the base64 in a state
      }
    } else {
      alert("Permission is not granted");
    }
  };

  // Image uploading function
  const uploadImage = async (base64: any) => {
    setUploading(true);

    // Imagebb URL to upload image
    const url = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

    const formData = new FormData();
    formData.append("image", base64);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.success) {
        // Get the image url from imagebb.
        return response.data.data.url;
      }
    } catch (error) {
      alert("Image upload failed, please try again.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#0C0F14] justify-center px-6">
      {loading || uploading ? (
        <LoadingSpinner />
      ) : (
        <View>
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

          {/* Image Picker Button */}
          <TouchableOpacity activeOpacity={0.8} className="mt-3">
            <Text
              onPress={pickImage}
              className="text-white text-center bg-[#ba7ed6] w-full text-lg py-1 rounded"
            >
              Select Image
            </Text>
          </TouchableOpacity>

          {/* Signup button */}
          <LoginSignUpButton
            buttonTitle="Sign Up"
            onPressFunction={handleSignUp}
          />

          <View className="flex-row justify-center mt-4">
            <Text className="text-[#AEAEAE] text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text className="text-[#D17842] text-sm">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
