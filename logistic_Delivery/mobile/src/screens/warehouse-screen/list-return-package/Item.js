import React from "react"
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from "react-native"

import { THEME_COLOR, THEME_SUB_COLOR, THEME_MAIN_COLOR } from "../../../utils/colors"

const FONT_LABEL = 17 / PixelRatio.getFontScale()

function Item({ item, openModal }) {
  return (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.container}>
      <Text style={styles.label}>{`Mã kiện: ${item.cartonNo}`}</Text>
      <Text style={styles.label}>{`Shipment: ${item.shipmentId}`}</Text>
      <Text style={styles.label}>{`Tên khách hàng: ${
        item?.pkg_receiver?.customer_receiver?.name || item?.shipment?.cneeName
      }`}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: THEME_COLOR,
    minHeight: 80,
    marginTop: "5%",
    borderRadius: 10,
    padding: "5%",
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: FONT_LABEL,
    marginTop: 5
  },
})

export default Item
