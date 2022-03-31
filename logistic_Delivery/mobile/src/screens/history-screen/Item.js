import React from "react"
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableWithoutFeedback,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

const FONT_LABEL = 20 / PixelRatio.getFontScale()

function Item({ item, navigation }) {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const role = store.LoginReducer.role

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        role == "shipper" && item.delivered != true
          ? navigation.navigate("DeliveryStatusScreen")
          : null
      }>
      <View style={styles.container}>
        <Text style={styles.label}>{item.title}</Text>
        <Text style={styles.date}>{`${item.time}, ${item.date}`}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    padding: "5%",
    marginBottom: "5%",
  },
  label: {
    fontSize: FONT_LABEL,
    fontWeight: "700",
    marginBottom: 20,
  },
  date: {
    fontSize: FONT_LABEL - 5,
    alignSelf: "flex-end",
  },
})

export default Item
