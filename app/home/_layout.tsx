import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{headerShown: false}} />
      <Stack.Screen name='details' options={{headerShown: false}} />
      <Stack.Screen name='payment' options={{headerShown: false}} />
    </Stack>
  )
}

export default HomeLayout

const styles = StyleSheet.create({})