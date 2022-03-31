import React, { useEffect, useState, useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native"
import {
  fetchListPackageByShipmentIdQrcode,
  updatePackageStatus,
} from "../../actions"
import { useDispatch, useSelector } from "react-redux"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../utils/colors"
import Modal from "../../components/modal"
import AnimationModal from "../../components/modal/animation"
import LoadingAction from "../../components/loading"

const Item = ({ item }) => {
  return (
    <View style={styles.containeritem}>
      <Text style={styles.label}>Mã Mawb: {item?.shipment?.wbId}</Text>
      <Text style={styles.label}>Mã kiện: {item.id}</Text>
      <Text style={styles.label}>
        Tên khách:{" "}
        {item?.pkg_receiver?.customer_receiver?.name ||
          item?.shipment?.cneeName}
      </Text>
    </View>
  )
}

const ListPackageByShipmentId = ({ route: { params }, navigation }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state)

  const [visibleModal, setVisibleModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const setup = AnimationModal.setup("scale")
  const valueAnimation = useRef(new Animated.Value(setup.value)).current

  const idShipment = JSON.parse(params.data).shipmentId

  const data = store?.ListPackageByShipmentIdQrcodeReducer?.data || []
  const userid = store?.LoginReducer?.id
  const visible = data || []

  const update = store?.UpdatePackageStatusReducer
  
  const progressBarLoading = update?.progressBarLoading

  const loading = update?.isLoading
  const loadingUpdate = store.ListPackageByShipmentIdQrcodeReducer?.isLoading

  const openModal = value => {
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).start()
  }

  const closeModal = () => {
    setTimeout(() => setVisibleModal(!visibleModal), 200)
    AnimationModal.scale(valueAnimation).close()
  }

  useEffect(() => {
    dispatch(
      fetchListPackageByShipmentIdQrcode({
        shipment_id: idShipment,
        navigation: navigation,
      }),
    )
  }, [])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    setIsLoading(loadingUpdate)
  }, [loadingUpdate])

  const updatePackage = () => {
    dispatch(
      updatePackageStatus({
        shipper_id: userid,
        status_id: 3,
        arr_upload: data,
        type: "import",
        navigation: navigation,
      }),
    )
    closeModal()
  }

  return (
    <LoadingAction isLoading={isLoading} progressBar={progressBarLoading}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data || []}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item, index) => index}
        />
        <TouchableOpacity
          onPress={() => openModal()}
          style={[
            styles.button,
            { display: visible.length == 0 ? "none" : null },
          ]}>
          <Text style={styles.labelButton}>Nhập hàng</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        visible={visibleModal}
        onClose={() => closeModal()}
        onCloseTouchOutSide={true}
        onCloseTopRight={false}
        valueAnimation={valueAnimation}
        useAnimation={true}
        typeAnimation={setup.type}
        footer={true}
        onActPress={() => updatePackage()}
        body={{
          type: "basic",
          title: { text: "Thông báo", style: { fontSize: 20 } },
          content: { text: "Xác nhận nhập hàng" },
        }}
        labelButtonBottom={{
          onAct: {
            label: "Đồng ý",
            style: {
              color: "white",
            },
            styleButton: {
              backgroundColor: THEME_COLOR,
            },
          },
          onCancel: {
            label: "Huỷ",
            style: {
              color: "white",
            },
            styleButton: {
              backgroundColor: "red",
            },
          },
        }}
      />
    </LoadingAction>
  )
}

export default ListPackageByShipmentId

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_MAIN_COLOR
  },
  containeritem: {
    marginTop: "5%",
    width: "90%",
    minHeight: 70,
    alignSelf: "center",
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 17,
    color: THEME_MAIN_COLOR,
    marginVertical: 5,
  },
  button: {
    position: "absolute",
    minWidth: 80,
    minHeight: 80,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    right: "5%",
    bottom: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  labelButton: {
    fontSize: 15,
    color: THEME_COLOR,
  },
})
