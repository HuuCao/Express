import React, { useEffect, useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  SafeAreaView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

import FontAwesome from "react-native-vector-icons/FontAwesome"
import Item from "./Item"
import Modal from "../../../components/modal"
import AnimationModal from "../../../components/modal/animation"
import FormReturnOrder from "../../../components/modal/custom/form-return-order"
import AntDesign from "react-native-vector-icons/AntDesign"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"
import Select from "../../../components/select"
import {
  fetchListPackageByWarehouseId,
  filter,
  filterButton,
  fetchReason,
  updetePackageDetail,
} from "../../../actions"
import LoadingAction from "../../../components/loading"

import BottomSheet from "../../../components/bottom-sheet"
import AnimationBottomSheet from "../../../components/bottom-sheet/animation"

function ListReturnPackage({ navigation }) {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const data = store?.ListPackageReducer
  const loadingPakage = store?.ListPackageReducer?.isLoading
  const wareHouseId = store?.LoginReducer?.wareHouseId

  const update = store?.UpdatePackageStatusReducer
  const loadingUpdate = update?.isLoading
  const progressBarLoading = update?.progressBarLoading
  const progressBarStatus = update?.update
  const dataReason = store?.ReasonReducer

  const [visibleModal, setVisibleModal] = useState(false)
  const [valueUpdate, setValueUpdate] = useState({})
  const setup = AnimationModal.setup("scale")
  const valueAnimation = useRef(new Animated.Value(setup.value)).current
  const [isLoading, setIsLoading] = useState(false)
  const [typeModal, setTypeModal] = useState(false)
  const [titleModal, setTitleModal] = useState("")
  const [reasonId, setReasonId] = useState(null)

  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false)
  const setupBottomSheet = AnimationBottomSheet.setup()
  const valueAnimationBottomSheet = useRef(new Animated.Value(setupBottomSheet))
    .current

  useEffect(() => {
    setIsLoading(loadingPakage)
  }, [loadingPakage])

  useEffect(() => {
    setIsLoading(loadingUpdate)
  }, [loadingUpdate])

  useEffect(() => {
    dispatch(fetchReason())
  }, [])

  const openModal = value => {
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).start()
    setValueUpdate(value)
  }

  const closeModal = () => {
    setTimeout(() => setVisibleModal(!visibleModal), 200)
    AnimationModal.scale(valueAnimation).close()
    setTimeout(() => {
      setTypeModal(false)
    }, 300)
  }

  const onCloseBottomSheet = () => {
    filterButton({ value: data.backup || data.data, type: "Shipment" }),
      setTimeout(() => {
        setVisibleBottomSheet(!visibleBottomSheet)
      }, 200)
    AnimationBottomSheet.useAnimation(valueAnimationBottomSheet).close()
  }

  const onOpenBottomSheet = () => {
    setVisibleBottomSheet(true)
    AnimationBottomSheet.useAnimation(valueAnimationBottomSheet).start()
  }

  const updatePackage = () => {
    dispatch(
      updetePackageDetail({
        id: valueUpdate.id,
        warehousepackage: {
          statusId: 7,
          wareHouseId: wareHouseId,
          reasonId: reasonId,
        },
      },null,null,"wh-return-package"),
    )
    setIsLoading(true)
    closeModal()
  }

  const listFilterButton = arr => {
    let newArr = []
    for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i].shipmentId) === -1) {
        newArr.push(arr[i].shipmentId)
      }
    }
    return newArr
  }

  const filterListPackage = value => {
    dispatch(filter({ value: value, type: "Shipment" }))
    onCloseBottomSheet()
  }

  const returnPackageWarehouse = () => {
    dispatch(
      updetePackageDetail({
        id: valueUpdate.id,
        warehousepackage: {
          statusId: 3,
          wareHouseId: wareHouseId,
        },
      },null,null,"wh-return-package"),
    )
    setIsLoading(true)
    closeModal()
  }

  const inventoryPackage = () => {
    setTypeModal(true)
    setTitleModal("tồn kho")
  }

  useEffect(() => {
    dispatch(fetchListPackageByWarehouseId({ status_id: 6 }))
  }, [])

  return (
    <LoadingAction isLoading={isLoading}>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => onOpenBottomSheet()}
            style={styles.boxButton}>
            <Text style={styles.buttonLabel}>Chọn shipment</Text>
            <AntDesign name="filter" color={"#AEAEAE"} size={20} />
          </TouchableOpacity>
          <FlatList
            data={data.data || []}
            renderItem={({ item }) => (
              <Item item={item} openModal={openModal} />
            )}
            keyExtractor={(item, index) => index}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("QrcodeScreen")}
            style={styles.boxButtonQrcode}>
            <FontAwesome name="qrcode" color={THEME_SUB_COLOR} size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <BottomSheet
        visible={visibleBottomSheet}
        onClose={onCloseBottomSheet}
        onCloseTouchOutSide={true}
        onCloseTopRight={true}
        valueAnimation={valueAnimationBottomSheet}>
        <View style={{ height: 300, width: "100%" }}>
          <FlatList
            data={listFilterButton(data.data || [])}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => filterListPackage(item)}
                  style={styles.filterButton}>
                  <Text>{`Shipment ${item}`}</Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      </BottomSheet>
      <Modal
        visible={visibleModal}
        onClose={() => closeModal()}
        onCloseTouchOutSide={true}
        onCloseTopRight={false}
        valueAnimation={valueAnimation}
        useAnimation={true}
        typeAnimation={setup.type}
        footer={typeModal}
        onActPress={() => updatePackage()}
        typeButtonBottom="onlyAct"
        body={{
          type: "custom",
          customModal: (
            <View>
              {typeModal ? (
                <View style={{ height: 200 }}>
                  <Text style={styles.title}>Chọn lý do hàng {titleModal}</Text>
                  <Select
                    onChange={value => setReasonId(value)}
                    data={dataReason.data || []}
                  />
                </View>
              ) : (
                <>
                  <Text style={styles.title}>Vui lòng lựa chọn</Text>
                  <View style={styles.box}>
                    <TouchableOpacity
                      onPress={returnPackageWarehouse}
                      style={styles.button}>
                      <Text style={styles.labelButton2}>Nhập lại kho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={inventoryPackage}
                      style={styles.button}>
                      <Text style={styles.labelButton2}>Hàng tồn</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ),
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
        }}
      />
    </LoadingAction>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_MAIN_COLOR,
  },
  boxButtonQrcode: {
    height: 70,
    width: 70,
    backgroundColor: THEME_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    position: "absolute",
    bottom: "5%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    zIndex: 3,
  },
  boxButton: {
    flexDirection: "row",
    width: "90%",
    minHeight: 50,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: "5%",
    marginTop: "5%",
    alignSelf: "center",
  },
  buttonLabel: {
    color: "#AEAEAE",
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 50,
  },
  box: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "47.5%",
    height: 40,
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  labelButton2: {
    fontSize: 15,
    color: "white",
  },
})

export default ListReturnPackage
