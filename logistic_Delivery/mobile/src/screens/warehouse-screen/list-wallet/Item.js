import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  TouchableOpacity,
} from "react-native"
import { THEME_COLOR } from "../../../utils/colors"
import { StringToVND } from "../../../utils/currency-unit"

const FONT_LABEL = 20 / PixelRatio.getFontScale()

function Item({ item, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("WalletDetailAdminScreen", item)}
      style={styles.container}>
      <Image
        style={styles.avata}
        source={{
          uri: item.avata,
        }}
      />
      <View style={styles.box}>
        <Text style={styles.label}>{item.name}</Text>
        <Text style={styles.proceeds}>{`Số tiền thu: ${StringToVND(
          item.proceeds,
        )}`}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLOR,
    marginBottom: "5%",
    padding: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  avata: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  box: {
    flex: 1,
    marginLeft: "5%",
    justifyContent: "center",
  },
  label: {
    fontSize: FONT_LABEL,
    fontWeight: "700",
  },
  proceeds: {
    fontSize: FONT_LABEL - 5,
  },
})

export default Item
