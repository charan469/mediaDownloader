import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Downloader from './Downloader'

export default function App() {
  return (
    <View style={styles.main}>
      <Downloader/>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    flex:1
  }
})