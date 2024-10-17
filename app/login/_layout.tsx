import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LoginLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}} />
    </Stack>
  )
}

export default LoginLayout

const styles = StyleSheet.create({})