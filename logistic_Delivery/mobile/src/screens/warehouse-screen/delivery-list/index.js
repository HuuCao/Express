import React, { useEffect, useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  PixelRatio,
  Animated,
} from "react-native"
import Item from "./Item"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchListPackageByWarehouseId,
  filter,
  filterButton,
  fetchListClient
} from "../../../actions"
import { THEME_COLOR, THEME_MAIN_COLOR } from "../../../utils/colors"

import BottomSheet from "../../../components/bottom-sheet"
import AnimationBottomSheet from "../../../components/bottom-sheet/animation"
import AntDesign from "react-native-vector-icons/AntDesign"
import LoadingAction from "../../../components/loading"

const FONT_LABEL_BUTTON = 18 / PixelRatio.getFontScale()
const FONT_LABEL_TOTAL = 20 / PixelRatio.getFontScale()

function DeliveryListWarehouseScreen({ navigation }) {
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false)
  const dispatch = useDispatch()
  const store = useSelector(state => state)

  const [title, setTitle] = useState("")

  const setup = AnimationBottomSheet.setup()
  const valueAnimation = useRef(new Animated.Value(setup)).current

  const listFilterButton = store?.ListFilterButtonReducer?.data

  const data = store?.ListPackageReducer
  const client = store?.ListClientReducer

  const activeButton = store?.ListPackageReducer?.activeButton
  const totalCheckBox = store?.ListPackageReducer?.totalCheckBox
  const isLoading = store?.ListPackageReducer?.isLoading

  useEffect(() => {
    dispatch(fetchListPackageByWarehouseId({ status_id: 3 }))
    dispatch(fetchListClient())
  }, [])

  const onCloseBottomSheet = () => {
    setTimeout(() => {
      setVisibleBottomSheet(!visibleBottomSheet)
    }, 200)
    AnimationBottomSheet.useAnimation(valueAnimation).close()
  }

  const onOpenBottomSheet = (type) => {
    if(type == 0) {
      setTitle("Shipment")
      dispatch(
        filterButton({ value: data.backup || data.data, type: "Shipment" }),
      )
    } else if(type == 1) {
      setTitle("Khách")
      dispatch(
        filterButton({ value: client.data || [], type: "Client" }),
      )
    }
   
    setVisibleBottomSheet(true)
    AnimationBottomSheet.useAnimation(valueAnimation).start()
  }

  const filterListPackage = value => {
    if(title == "Shipment") {
      dispatch(filter({ value: value, type: "Shipment" }))
    } else if (title == "Khách") {
      dispatch(filter({ value: value, type: "Client" }))
    }
    
    onCloseBottomSheet()
  }

  const _total = () => {
    return (
      <Text style={styles.totalLabel}>{`Tổng bưu kiện đã chọn: ${
        totalCheckBox || 0
      }`}</Text>
    )
  }

  return (
    <LoadingAction isLoading={isLoading}>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => onOpenBottomSheet(0)}
            style={styles.boxButton}>
            <Text style={styles.buttonLabel}>Chọn Shipment</Text>
            <AntDesign name="filter" color={"#AEAEAE"} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onOpenBottomSheet(1)}
            style={styles.boxButton}>
            <Text style={styles.buttonLabel}>Chọn khách</Text>
            <AntDesign name="filter" color={"#AEAEAE"} size={20} />
          </TouchableOpacity>
          <FlatList
            data={data.data || []}
            renderItem={({ item }) => (
              <Item navigation={navigation} data={item} />
            )}
            keyExtractor={(item, index) => index}
            ListFooterComponent={_total()}
          />
          {activeButton ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("ListShipperWarehouseScreen")}
              style={styles.button}>
              <Text style={styles.labelButton}>Shipper</Text>
            </TouchableOpacity>
          ) : null}
          <BottomSheet
            visible={visibleBottomSheet}
            onClose={onCloseBottomSheet}
            onCloseTouchOutSide={true}
            onCloseTopRight={true}
            valueAnimation={valueAnimation}>
            <View style={{ height: 300, width: "100%" }}>
              <FlatList
                data={listFilterButton}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => filterListPackage(item.shipmentId || item.value)}
                      style={styles.filterButton}>
                      <Text>{`${title} ${item.name}`}</Text>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={
                  <TouchableOpacity
                    onPress={() => filterListPackage("all")}
                    style={styles.filterButton}>
                    <Text>{`Tất cả`}</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          </BottomSheet>
        </View>
      </SafeAreaView>
    </LoadingAction>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 3,
    zIndex: 3,
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    fontSize: FONT_LABEL_BUTTON,
    color: THEME_COLOR,
  },
  totalLabel: {
    fontSize: FONT_LABEL_TOTAL,
    alignSelf: "center",
    color: "white",
    marginTop: "5%",
  },
  boxButton: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    minHeight: 50,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: "5%",
    marginTop: "5%",
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
})

export default DeliveryListWarehouseScreen
