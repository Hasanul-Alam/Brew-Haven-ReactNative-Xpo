import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{headerShown: false, title: 'Home'}} />
      <Tabs.Screen name='cart' options={{headerShown: false, title: 'Cart'}} />
      <Tabs.Screen name='favourite' options={{headerShown: false, title: 'Favourite'}} />
      <Tabs.Screen name='orders' options={{headerShown: false, title: 'Orders'}} />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})