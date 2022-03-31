import React, { useState, useMemo } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { THEME_COLOR } from "../../../utils/colors"
import Select from "../../../components/select"
import { useDispatch, useSelector } from "react-redux"
import { updatePackageStatus } from "../../../actions"

const ListOrderShipment = ({ onClose, data, navigation }) => {
  const update = store?.UpdatePackageStatusReducer

  const [shipperId, setShipperId] = useState(null)

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const arrIsCheck = store?.ListPackageReducer?.arrIsCheck || []

  const updateListPackage = () => {
    dispatch(
      updatePackageStatus({
        shipper_id: shipperId,
        status_id: 4,
        arr_upload: arrIsCheck,
        fromScreen: "wh-list-package",
        navigation: navigation,
        method: "at_warehouse",
        type: "import",
      }),
    )
    onClose()
  }

  return (
    <View>
      <View style={styles.box}>
        <Text style={styles.title}>Chọn shipper</Text>
        <Select onChange={setShipperId} data={data} />
      </View>
      <TouchableOpacity onPress={updateListPackage} style={styles.buttonModal}>
        <Text style={styles.labelbuttonModal}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListOrderShipment

const styles = StyleSheet.create({
  buttonModal: {
    width: "100%",
    height: 40,
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: "5%",
    alignSelf: "center",
  },
  labelbuttonModal: {
    fontSize: 16,
    alignSelf: "center",
    color: "white",
  },
  labelModal: {
    fontSize: 18,
  },
  box: {
    height: 250,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    marginVertical: 10
  }
})
