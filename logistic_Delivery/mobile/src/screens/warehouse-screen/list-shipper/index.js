import React, { useRef, useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native"
import Item from "./Item"
import Form from "../../../components/form"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Modal from "../../../components/modal"
import AnimationModal from "../../../components/modal/animation"
import { THEME_COLOR } from "../../../utils/colors"
import { useDispatch, useSelector } from "react-redux"
import { fetchListShipperByWarehouseId, updatePackageStatus } from "../../../actions"

import LoadingAction from "../../../components/loading"

function ListShipperAdmin({ navigation }) {
  const [visibleModal, setVisibleModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shipperIdUpload, setShipperIdUpload] = useState(null)
  const setup = AnimationModal.setup("scale")
  const valueAnimation = useRef(new Animated.Value(setup.value)).current

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const data = store?.ListShipperReducer
  const loading = store?.ListShipperReducer?.isLoading
  const arrIsCheck = store?.ListPackageReducer?.arrIsCheck || []

  const update = store?.UpdatePackageStatusReducer
  const isLoadingUpdate = update?.isLoading
  let progressBarLoading = update?.progressBarLoading
  let progressBarStatus = update?.update

  const openModal = () => {
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).start()
  }

  const closeModal = () => {
    setTimeout(() => setVisibleModal(!visibleModal), 200)
    AnimationModal.scale(valueAnimation).close()
  }

  useEffect(() => {
    dispatch(fetchListShipperByWarehouseId())
  }, [])

  useEffect(() => {
    if (progressBarStatus == "loading") {
      setIsLoading(isLoadingUpdate)
    } else if (progressBarStatus == "done") {
      setTimeout(() => {
        setIsLoading(isLoadingUpdate)
        navigation.goBack()
      }, 2000)
    } else if (progressBarStatus == "error") {
      Alert.alert("Thông báo", "Lỗi cập nhật trạng thái")
    }
  }, [isLoadingUpdate])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  const uploadStatusPackage = () => {
    dispatch(
      updatePackageStatus({
        arr_upload: arrIsCheck,
        status_id: 4,
        shipper_id: shipperIdUpload,
        fromScreen: "wh-list-shipper"
      }),
    )
    closeModal()
  }

  const shipperId = id => {
    setShipperIdUpload(id)
  }

  const listInput = [
    {
      key: 1,
      name: "search",
      styleInput: {
        borderRadius: 10,
        paddingStart: 50,
      },
      icon: <FontAwesome5 name="search" color={"rgba(0,0,0,0.19)"} size={21} />,
    },
  ]
  return (
    <LoadingAction
      isLoading={isLoading}
      progressBar={progressBarLoading}
      messageIsDone="Hoàn tất">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Form
            style={{ paddingHorizontal: 0 }}
            listInput={listInput}
            styleButtonSubmit={{ display: "none" }}
          />
          <FlatList
            data={data?.data || []}
            renderItem={({ item }) => (
              <Item
                item={item}
                openModal={() => openModal()}
                navigation={navigation}
                shipperId={shipperId}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
      <Modal
        visible={visibleModal}
        onClose={() => closeModal()}
        onCloseTouchOutSide={true}
        onCloseTopRight={true}
        valueAnimation={valueAnimation}
        useAnimation={true}
        typeAnimation={setup.type}
        footer={true}
        onActPress={uploadStatusPackage}
        body={{
          type: "basic",
          title: { text: "Thông báo", style: { fontSize: 20 } },
          content: { text: "Xác nhận chọn shipper" },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  isLoading: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ListShipperAdmin
