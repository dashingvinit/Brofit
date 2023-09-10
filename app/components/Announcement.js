import React,{ useState } from 'react'
import { View, Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native'
import { neon } from '../constants/Constants'

const Announcement = () => {

    const [message,setMessage] = useState('')

  return (
    <View style={{marginTop:50}}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:neon,fontSize:24}}> Announcements </Text>
        </View>
        <View style={{alignItems:'center'}}>
        <TextInput
            style={styles.input}
            placeholder=" Message "
            value={message}
            onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={{fontSize:20}}>Send</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
input: {
    color: 'black',
    backgroundColor: '#FAF3F0',
    borderRadius: 10,
    padding: 10,
    margin:20,
    width:'85%'
  },
button : {
    backgroundColor:neon,
    height:40,
    width:80,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
},
})

export default Announcement
