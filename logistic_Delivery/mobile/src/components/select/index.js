import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { THEME_COLOR } from "../../utils/colors"

const Item = ({ item, active, setActive }) => {
  return (
    <TouchableOpacity onPress={() => setActive(item.id)} style={styles.body}>
      <View style={[styles.dot, item.id == active && styles.active]}></View>
      <Text style={styles.label}>{item?.name || item?.tag}</Text>
    </TouchableOpacity>
  )
}

const ChooseItem = ({ data, onChange }) => {
  const [active, setActive] = useState(data[0].id)

  useEffect(() => {
    onChange(active)
  }, [active])
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item item={item} active={active} setActive={setActive} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default ChooseItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: "5%",
    borderBottomWidth: 0.7,
    flexDirection: "row",
    borderColor: "gray",
  },
  dot: {
    width: 10,
    height: 10,
    alignSelf: "center",
  },
  active: {
    backgroundColor: THEME_COLOR,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginLeft: "5%",
  },
})
