import React from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import Item from "./Item"

function HistoryScreen({ navigation }) {
  const data = [
    {
      id: 1,
      delivered: false,
      title: "Đang giao hàng",
      time: "14: 00",
      date: "14/04/2021",
    },
    {
      id: 2,
      delivered: false,
      title: "Đang giao hàng",
      time: "14: 00",
      date: "14/04/2021",
    },
    {
      id: 3,
      delivered: true,
      title: "Giao hàng thành công",
      time: "14: 00",
      date: "14/04/2021",
    },
  ]
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
})

export default HistoryScreen
