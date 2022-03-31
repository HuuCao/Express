import React from "react"
import { StyleSheet, Text, View, SafeAreaView } from "react-native"

const ListPackageShipperScreen = ({ route: { params }, navigation }) => {
  console.log(params)
  return (
    <SafeAreaView style={styles.container}>
      <Text>123</Text>
    </SafeAreaView>
  )
}

export default ListPackageShipperScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
