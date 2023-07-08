import React from 'react'
import { Text, View } from 'react-native'

const SettingsScreen = (navigation) => {
  return (
    <View>
        <Text
        onPress={() => navigation.navigate('Home')}>hlo</Text>
    </View>
  )
}

export default SettingsScreen
