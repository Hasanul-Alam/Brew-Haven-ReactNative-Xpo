import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Login = () => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/home");
  }

  return (
    <View className='flex-1 justify-center items-center min-h-screen'>
      <Text className='text-white'>Login</Text>
      <Text onPress={navigateToHome} className='text-white bg-green-600 px-3 py-2 rounded-lg mt-2'>Go to home</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})