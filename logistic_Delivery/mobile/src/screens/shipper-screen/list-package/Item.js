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
import { updateCheckBoxListPackageByShipperId } from "../../../actions"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"

const FONTSIZE_ID_LABEL = 15 / PixelRatio.getFontScale()
const FONTSIZE_STATE_LABEL = 20 / PixelRatio.getFontScale()

function ItemList({ data, navigation }) {
  const dispatch = useDispatch()

  const store = useSelector(state => state)
  const allReady = store?.ListPackageReducer?.allReady

  _updateItem = (value, id) => {
    dispatch(updateCheckBoxListPackageByShipperId({ value: value, id: id }))
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PackageDetailShipperScreen", {id: data.id, data: data})}
      style={[styles.container, { backgroundColor: data.ready ? THEME_COLOR : "rgba(255, 165, 0, 0.5)" }]}>
      <Text style={styles.label}>{`Mã kiện hàng: ${data.cartonNo}`}</Text>
      <Text
        style={
          styles.label
        }>{`Tên khách hàng: ${data?.pkg_receiver?.customer_receiver?.name || data.cneeName}`}</Text>
      <View style={styles.checkbox}>
        {allReady ? (
          <CheckBox
            iconColor={THEME_COLOR}
            onChange={value => _updateItem(value, data.id)}
          />
        ) : null}
      </View>
      <View style={[styles.boxState, { display: allReady ? "none" : null }]}>
        <Text style={styles.labelState}>
          {data.ready ? "Đã quét" : "Chưa quét"}
        </Text>
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
    color: THEME_MAIN_COLOR,
    fontWeight: "600",
  },
  labelState: {
    fontSize: FONTSIZE_STATE_LABEL,
  },
  boxState: {
    minWidth: "40%",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 10,
    alignItems: "center",
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

export default ItemList
