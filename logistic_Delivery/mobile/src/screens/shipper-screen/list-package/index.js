import React, { useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from "react-native"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"
import { useDispatch, useSelector } from "react-redux"
import Item from "./Item"
import { fetchListClient, fetchListPackageByShipperId } from "../../../actions"
import Modal from "../../../components/modal"
import AnimationModal from "../../../components/modal/animation"
import ListClient from "../../../components/modal/custom/list-client"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import LoadingAction from "../../../components/loading"

function ListPackageScreen({ navigation }) {
  const [visibleModal, setVisibleModal] = useState(false)
  const dispatch = useDispatch()
  const store = useSelector(state => state)

  const data = store?.ListPackageReducer
  const shipper = store?.LoginReducer

  const isLoading = data?.isLoading
  const activeButton = data.activeButton
  const isCheck = data?.isCheck 
  const arrIsCheck = data?.arrIsCheck

  const setup = AnimationModal.setup("scale")
  const valueAnimation = useRef(new Animated.Value(setup.value)).current

  const openModal = () => {
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).start()
  }

  const closeModal = () => {
    setTimeout(() => setVisibleModal(!visibleModal), 200)
    AnimationModal.scale(valueAnimation).close()
  }

  const delivery = () => {
    if(isCheck) {
      navigation.navigate("PackageDeliveryScreen", {data: arrIsCheck})
    } else {
      openModal()
    }
  }

  useEffect(() => {
    dispatch(fetchListClient())
    dispatch(fetchListPackageByShipperId())
  }, [])

  return (
    <LoadingAction isLoading={isLoading}>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
        <View style={styles.container}>
          <FlatList
            data={data.data || []}
            renderItem={({ item }) => (
              <Item navigation={navigation} data={item} />
            )}
            keyExtractor={item => item.id}
            ListHeaderComponent={<Text style={{marginLeft: "5%", marginTop: "5%", fontSize: 15, fontWeight: "bold", color: THEME_SUB_COLOR}}>Shipper: {shipper?.name}</Text>}
          />

          {activeButton ? (
            <TouchableOpacity
              onPress={() => delivery()}
              style={styles.buttonShiper}>
              <Text style={styles.buttonLabel}>Giao hàng</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => navigation.navigate("QrcodeScreen")}
            style={styles.boxButton}>
            <FontAwesome name="qrcode" color={"white"} size={30} />
          </TouchableOpacity>
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
        footer={false}
        body={{
          type: "basic",
          title: {text: "Cảnh báo", style: {fontSize: 18}},
          content: {text: "Không thể chọn nhiều hơn 1 khách khi giao hàng!"}
        }}
      />
    </LoadingAction>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonShiper: {
    width: 80,
    height: 80,
    backgroundColor: THEME_COLOR,
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
  buttonLabel: {
    color: "white",
  },
  boxButton: {
    height: 80,
    width: 80,
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
})

export default ListPackageScreen
