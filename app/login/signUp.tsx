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
  const { signup, setUser, setError } = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  /* const handleSignUp = async () => {
    setLoading(true);
    try {
      // Type userCredential as UserCredential
      const userCredential: UserCredential = await signup(email, password);

      if (userCredential?.user) {
        setUser(userCredential.user); // Set user data to state

        saveData({email: userCredential.user.email, uid: userCredential.user.uid}); // Set user data to local storage

        setLoading(false); // Set Loading state

        router.replace("/home"); // Redirect to the homepage after successful signup

        console.log(userCredential.user.email, userCredential.user.uid);
      }
    } catch (error: any) {
      // Add 'any' type to error for proper typing
      setError?.(error.message);
      setLoading(false);
      console.log("Error during signup:", error.code, error.message);
    }
  }; */

  const handleSignUp = () => {
    console.log(name, email, password);
  };

  const API_KEY = "a034eb9194a3961792dc743224e30bd2";

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      console.log("permission is granted");

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true, // Get the base64 string
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        uploadImage(result.assets[0].base64);
      }

      // console.log(result.assets[0].base64);
    } else {
      alert("Permission is not granted");
    }
  };

  const uploadImage = async (base64: any) => {
    setUploading(true);
    const url = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

    const formData = new FormData();
    formData.append('image', base64);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.success) {
        setUploadSuccess(response.data.data.url);  // Get the image URL from ImgBB
        alert('Image uploaded successfully');
        console.log(response.data.data.url)
      }
    } catch (error) {
      alert('Image upload failed, please try again.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#0C0F14] justify-center px-6">
      {loading ? (
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
          <Button title="Pick an image from camera roll" onPress={pickImage} />

          {/* SignUp Button */}
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
