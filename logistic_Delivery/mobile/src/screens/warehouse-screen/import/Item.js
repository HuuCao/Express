import React from "react"
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from "react-native"

import { THEME_COLOR } from "../../../utils/colors"

const FONT_LABEL = 18 / PixelRatio.getFontScale()

function Item({ item, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ListPackageScreen", {shipment_id: item.id})}
      style={[styles.container, { display: item?.at_warehouse == 0 && item?.state == "closed" ? null : "none"}]}>
      <View style={styles.box}>
        <Text style={styles.label}>{`Mawb: ${item.wbId}`}</Text>
        <Text style={styles.label}>{`Shipment: ${item.invoiceNo}`}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: THEME_COLOR,
    marginTop: "5%",
    borderRadius: 10,
    padding: "5%",
  },
  box: {
    
  },
  label: {
    fontSize: FONT_LABEL,
    marginVertical: 5
  },
})

export default Item
