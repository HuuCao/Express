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
import AntDesign from "react-native-vector-icons/AntDesign"
import Item from "./Item"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchListShipmentByWarehouseId,
  filter,
  filterButton,
} from "../../../actions"
import BottomSheet from "../../../components/bottom-sheet"
import AnimationBottomSheet from "../../../components/bottom-sheet/animation"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"
import LoadingAction from "../../../components/loading"

function ImportAdminScreen({ navigation }) {
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false)
  const [titleFilter, setTitleFilter] = useState(true)
  const [typeFilter, setTypeFilter] = useState(null)

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const data = store?.ListShipmentReducer
  const listFilterButton = store?.ListFilterButtonReducer?.data

  const setup = AnimationBottomSheet.setup()
  const valueAnimation = useRef(new Animated.Value(setup)).current

  useEffect(() => {
    dispatch(fetchListShipmentByWarehouseId())
  }, [])

  const onCloseBottomSheet = () => {
    setTimeout(() => {
      setVisibleBottomSheet(!visibleBottomSheet)
    }, 200)
    AnimationBottomSheet.useAnimation(valueAnimation).close()
  }

  const onOpenBottomSheet = type => {
    setTypeFilter(type)

    if (type == 0) {
      setTitleFilter("Mawb")
      dispatch(filterButton({ value: data.backup || data.data, type: "Mawb" }))
    } else if (type == 1) {
      setTitleFilter("Shipment")
      dispatch(
        filterButton({
          value: data.backup || data.data,
          type: "Shipment-import",
        }),
      )
    }

    setVisibleBottomSheet(true)
    AnimationBottomSheet.useAnimation(valueAnimation).start()
  }

  const filterListPackage = value => {
    if (typeFilter == 0) {
      dispatch(filter({ value: value, type: "Mawb" }))
    } else if (typeFilter == 1) {
      dispatch(filter({ value: value, type: "Shipment-import" }))
    }
    onCloseBottomSheet()
  }

  return (
    <LoadingAction isLoading={data.isLoading}>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => onOpenBottomSheet(0)}
            style={styles.boxButton}>
            <Text style={styles.buttonLabel}>Chọn Mawb</Text>
            <AntDesign name="filter" color={"#AEAEAE"} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onOpenBottomSheet(1)}
            style={styles.boxButton}>
            <Text style={styles.buttonLabel}>Chọn Shipment</Text>
            <AntDesign name="filter" color={"#AEAEAE"} size={20} />
          </TouchableOpacity>
          <FlatList
            data={data.data || []}
            renderItem={({ item }) => (
              <Item navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
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
                      onPress={() =>
                        filterListPackage(item?.shipmentId || item?.value)
                      }
                      style={styles.filterButton}>
                      <Text>{`${titleFilter} ${item.name}`}</Text>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                  <TouchableOpacity
                    onPress={() => filterListPackage("all-import")}
                    style={styles.filterButton}>
                    <Text>{`Tất cả`}</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          </BottomSheet>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("QrcodeScreen")}
          style={styles.boxButtonQrcode}>
          <FontAwesome name="qrcode" color={THEME_SUB_COLOR} size={30} />
        </TouchableOpacity>
      </SafeAreaView>
    </LoadingAction>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_MAIN_COLOR,
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

export default ImportAdminScreen
