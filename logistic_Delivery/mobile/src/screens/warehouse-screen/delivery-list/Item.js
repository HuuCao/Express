import React from "react"
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import CheckBox from "../../../components/check-box"
import { updateCheckBoxListPackageByWarehouseId } from "../../../actions"
import { THEME_COLOR, THEME_SUB_COLOR, THEME_MAIN_COLOR } from "../../../utils/colors"

const FONTSIZE_ID_LABEL = 15 / PixelRatio.getFontScale()

function Item({ data, navigation }) {
  const dispatch = useDispatch()

  const _updateItem = (value, id) => {
    dispatch(updateCheckBoxListPackageByWarehouseId({ value: value, id: id }))
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PackageDetailWarehouseScreen", { data: data, fromScreen: "delivery" })
      }
      style={styles.container}>
      <Text style={styles.label}>{`Mã kiện hàng: ${data.cartonNo}`}</Text>
      <Text style={styles.label}>{`Shipment: ${data.shipmentId}`}</Text>
      <Text style={styles.label}>{`Tên khách hàng: ${
        data?.pkg_receiver?.customer_receiver?.name || data?.shipment?.cneeName
      }`}</Text>
      <View style={styles.checkbox}>
        <CheckBox
          style={{ backgroundColor: THEME_SUB_COLOR }}
          iconColor={THEME_COLOR}
          onChange={value => _updateItem(value, data.id)}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: "5%",
    backgroundColor: THEME_COLOR,
    minHeight: 100,
    padding: "5%",
    borderRadius: 10,
  },
  label: {
    fontSize: FONTSIZE_ID_LABEL,
    fontWeight: "600",
    marginTop: 5,
  },
  checkbox: {
    position: "absolute",
    height: 40,
    width: 40,
    zIndex: 1,
    elevation: 1,
    right: "5%",
    top: "49%",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Item
