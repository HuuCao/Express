import React from "react"
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import Item from "./Item"

function ListWalletAdminScreen({ navigation }) {
  const data = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avata: "https://www.enigmatixmedia.com/public/pics/demo.png",
      proceeds: 10000000,
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      avata: "https://www.enigmatixmedia.com/public/pics/demo.png",
      proceeds: 20000000,
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      avata: "https://www.enigmatixmedia.com/public/pics/demo.png",
      proceeds: 30000000,
    },
  ]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
})

export default ListWalletAdminScreen
