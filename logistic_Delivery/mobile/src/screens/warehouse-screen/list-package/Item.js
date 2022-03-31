import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import CheckBox from "../../../components/check-box"
import { THEME_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"
import { useDispatch, useSelector } from "react-redux"
import { updateCheckBoxListPackageByShipmentId } from "../../../actions"

const Item = ({ data, navigation }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state)

  function updateCheckbox (value, id) {
    dispatch (updateCheckBoxListPackageByShipmentId({ value: value, id: id }))
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PackageDetailWarehouseScreen", { data: data })
      }
      style={[
        styles.container,
        {
          display: data?.warehouse_package?.statusId == 2 ? null : "none",
          backgroundColor:
            data.realWeight != 0 && data.realWeight != null
              ? "#316DE0"
              : THEME_COLOR,
        },
      ]}>
      <View>
        <Text style={styles.label}>{`Mawb: ${data.shipment.wbId}`}</Text>
        <Text style={styles.label}>{`Mã kiện: ${data.cartonNo}`}</Text>
        <Text style={styles.label}>{`Tên khách hàng: ${
          data?.pkg_receiver?.customer_receiver?.name ||
          data?.shipment?.cneeName
        }`}</Text>
      </View>
      <CheckBox
        iconColor={THEME_COLOR}
        onChange={value => updateCheckbox(value, data.id)}
      />
    </TouchableOpacity>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: THEME_COLOR,
    marginTop: "5%",
    padding: "5%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
})
