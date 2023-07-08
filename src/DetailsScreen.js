import React from 'react'
import { Text, View } from 'react-native'

const DetailsScreen = (navigation) => {
  return (
    <View>
        <Text
        onPress={() => navigation.navigate('Home')}>hello</Text>
    </View>
  )
}

export default DetailsScreen
