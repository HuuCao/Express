import React, { useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native"
import Item from "./Item"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchListPackageByShipmentId,
  fetchListShipperByWarehouseId,
  updatePackageStatus,
} from "../../../actions"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"
import Modal from "../../../components/modal"
import AnimationModal from "../../../components/modal/animation"
import CustomModal from "../../../components/modal/custom/list-order-shipment"
import LoadingAction from "../../../components/loading"

const Footer = ({navigation}) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const setup = AnimationModal.setup("scale")
  const valueAnimation = useRef(new Animated.Value(setup.value)).current
  const [typeModal, settypeModal] = useState(null)

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const data = store?.ListShipperReducer.data
  const activeButton = store?.ListPackageReducer?.activeButton
  const arrIsCheck = store?.ListPackageReducer?.arrIsCheck || []
  const userid = store?.LoginReducer?.id

  const res_uptate = store?.UpdatePackageStatusReducer

  const check_info = store?.ListPackageReducer?.checkeInfo

  const openModal = () => {
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).start()
    if (check_info) {
      settypeModal(0)
    } else {
      settypeModal(1)
    }
  }

  const closeModal = () => {
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).close()
  }

  useEffect(() => {
    dispatch(fetchListShipperByWarehouseId())
  }, [])

  const update = () => {
    settypeModal(1)
    if (check_info) {
      dispatch(
        updatePackageStatus({
          shipper_id: userid,
          status_id: 3,
          arr_upload: arrIsCheck,
          type: "import",
          fromScreen: "wh-list-package",
          method: "at_warehouse",
          navigation: navigation
        }),
      )
    } else {
      setVisibleModal(!visibleModal)
      AnimationModal.scale(valueAnimation).start()
    }
  }

  return (
    <View style={styles.containerFooter}>
      <TouchableOpacity
        onPress={update}
        disabled={!activeButton}
        style={[styles.button1, { backgroundColor: "#316DE0" } ,{ opacity: !activeButton ? 0.5 : null }]}>
        <Text style={styles.labelbutton}>Nhập kho</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <TouchableOpacity
          disabled={!activeButton}
          onPress={openModal}
          style={[
            styles.button1,
            { backgroundColor: "#79E045" },
            { width: "47.5%", opacity: !activeButton ? 0.5 : null },
          ]}>
          <Text style={styles.labelbutton}>Giao hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button1, { backgroundColor: "orange" } ,{ width: "47.5%" }]}>
          <Text style={styles.labelbutton}>In Bill</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={visibleModal}
        onClose={() => closeModal()}
        onCloseTouchOutSide={false}
        onCloseTopRight={true}
        valueAnimation={valueAnimation}
        useAnimation={true}
        typeAnimation={setup.type}
        footer={false}
        body={
          typeModal == 0
            ? {
                type: "custom",
                customModal: <CustomModal navigation={navigation} data={data} onClose={closeModal} />,
              }
            : {
                type: "basic",
                title: { text: "Thông báo", style: { fontSize: 21 } },
                content: {
                  text: "Vui lòng nhập đủ thông tin!",
                },
              }
        }
      />
    </View>
  )
}

const ListPackage = ({ navigation, route }) => {
  const { shipment_id } = route.params
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const data = store?.ListPackageReducer
  const loadingPackage = data?.isLoading

  const update = store?.UpdatePackageStatusReducer
  const loading = update?.isLoading
  let progressBarLoading = update?.progressBarLoading
  let progressBarStatus = update?.update

  useEffect(() => {
    dispatch(
      fetchListPackageByShipmentId({
        shipment_id: shipment_id,
        navigation: navigation,
      }),
    )
  }, [])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    setIsLoading(loadingPackage)
  }, [loadingPackage])

  return (
    <LoadingAction
      isLoading={isLoading}
      progressBar={progressBarLoading}
      messageIsDone="Hoàn tất">
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <FlatList
            data={data.data || []}
            renderItem={({ item }) => (
              <Item navigation={navigation} data={item} />
            )}
            keyExtractor={(item, index) => index}
            ListFooterComponent={<Footer navigation={navigation}/>}
          />
        </View>
      </SafeAreaView>
    </LoadingAction>
  )
}

export default ListPackage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_MAIN_COLOR,
  },
  body: {
    flex: 1,
  },
  containerFooter: {
    alignSelf: "center",
    width: "90%",
    marginTop: "5%",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: "5%",
  },
  button1: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  labelbutton: {
    fontSize: 16,
    alignSelf: "center",
    color: THEME_SUB_COLOR,
  },
  box: {
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "space-between",
  },
})
