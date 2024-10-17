import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RegistrationLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}} />
    </Stack>
  )
}

export default RegistrationLayout

const styles = StyleSheet.create({})