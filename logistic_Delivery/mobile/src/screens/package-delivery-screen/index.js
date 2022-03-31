import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  PixelRatio,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Platform,
  Alert,
} from "react-native"
import {
  THEME_COLOR,
  THEME_SUB_COLOR,
  THEME_MAIN_COLOR,
} from "../../utils/colors"

import Modal from "../../components/modal"
import AnimationModal from "../../components/modal/animation"
import CheckBox from "../../components/check-box"

import AntDesign from "react-native-vector-icons/AntDesign"

import ImagePicker from "react-native-image-crop-picker"
import { StringToVND } from "../../utils/currency-unit"

import { useDispatch, useSelector } from "react-redux"

import { updateCodReceived, updatePackageStatus } from "../../actions"

import LoadingAction from "../../components/loading"

const FONTSIZE_LABEL = 17 / PixelRatio.getFontScale()
const FONTSIZE_LABEL_2 = 24 / PixelRatio.getFontScale()

function PackageDeliveryScreen({ navigation, route: { params } }) {
  const data = params.data[0]
  const nameClient =
    data?.pkg_receiver?.customer_receiver?.name || data?.cneeName
  const numberClient =
    data?.pkg_receiver?.customer_receiver?.tel || data?.cneePhone
  const addressClient =
    data?.pkg_receiver?.customer_receiver?.address || data?.cneeAddress
  const arrPackage = params.data

  const cod = arrPackage.reduce((target, value) => {
    return target + value?.fee?.cod || 0
  }, 0)

  const [visibleModal, setVisibleModal] = useState(false)
  const [alertContent, setAlertContent] = useState("")
  const [typeButton, setTypeButton] = useState(null)

  const [arrImage, setArrImage] = useState([])
  const [arrVideo, setArrVideo] = useState([])

  const [disabledButton, setDisabledButton] = useState(false)

  const setup = AnimationModal.setup("scale")
  const valueAnimation = useRef(new Animated.Value(setup.value)).current

  let isLoading = false
  let progressBarLoading = 0

  const dispatch = useDispatch()
  const store = useSelector(state => state)

  isLoading = store.UpdateCodReceivedReducer?.isLoading
  isLoading = store.UpdatePackageStatusReducer?.isLoading

  progressBarLoading = store.UpdateCodReceivedReducer?.progressBarLoading
  progressBarLoading = store.UpdatePackageStatusReducer?.progressBarLoading

  const userid = store?.LoginReducer?.id

  const openModal = (content, type) => {
    setTypeButton(type)
    setAlertContent(content)
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).start()
  }

  const closeModal = () => {
    setTimeout(() => setVisibleModal(!visibleModal), 200)
    AnimationModal.scale(valueAnimation).close()
  }

  const onActPress = () => {
    closeModal()
    if (typeButton == 0) {
      dispatch(updateCodReceived(arrPackage, navigation))
      setDisabledButton(true)
    } else if (typeButton == 1) {
      dispatch(
        updatePackageStatus({
          shipper_id: userid,
          status_id: 6,
          arr_upload: arrPackage,
          fromScreen: "sp-delivery",
          navigation: navigation,
        }),
      )
      setDisabledButton(true)
    }
  }

  const takeMultiplePhoto = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(images => {
        console.log(images)
        setArrImage(images)
      })
      .catch(err => console.log(err))
  }

  const takeVideo = () => {
    ImagePicker.openPicker({
      mediaType: "video",
      multiple: true,
    })
      .then(video => {
        setArrVideo(video)
      })
      .catch(err => console.log(err))
  }

  return (
    <LoadingAction isLoading={isLoading} progressBar={progressBarLoading}>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.label}>{`Tên khách hàng: ${nameClient}`}</Text>
            <Text style={styles.label}>{`Số điện thoại: ${numberClient}`}</Text>

            <Text style={styles.label}>Địa chỉ: {addressClient}</Text>
            <Text style={styles.label}>
              Mã kiện:{" "}
              {arrPackage.map(item => {
                return item.id + ", "
              })}
            </Text>
            <Text style={styles.label}>
              Số hoá đơn:{" "}
              {arrPackage.map(item => {
                return item.pcs + ", "
              })}
            </Text>
            <View style={styles.box}>
              <Text style={styles.label2}>Cần thu</Text>
              <View style={styles.box2}>
                <Text
                  style={[
                    styles.label,
                    { color: "black", marginBottom: "0%" },
                  ]}>
                  {StringToVND(cod)}
                </Text>
              </View>
            </View>
            <View style={styles.box3}>
              <CheckBox
                disable={true}
                defaulValue={data.coCheck == 1 ? true : false}
                style={{ backgroundColor: THEME_COLOR }}
                iconColor="white"
                onChange={value => console.log(value)}
              />
              <Text style={styles.label3}>Đồng kiểm</Text>
            </View>
            <View style={styles.boxUpload}>
              <TouchableOpacity
                onPress={takeMultiplePhoto}
                style={styles.buttonUpload}>
                <AntDesign name="upload" color="#000" size={20} />
                <Text style={styles.labelButtonUpload}>Upload image</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takeVideo} style={styles.buttonUpload}>
                <AntDesign name="upload" color="#000" size={20} />
                <Text style={styles.labelButtonUpload}>Upload video</Text>
              </TouchableOpacity>
            </View>

            {arrImage.length != 0 ? (
              <>
                <View style={styles.box5}>
                  <Text style={styles.label4}>Hình ảnh</Text>
                  <Text
                    onPress={() => setArrImage([])}
                    style={[styles.label4, { color: "red", marginLeft: "5%" }]}>
                    Xoá hình
                  </Text>
                </View>
                <View style={[styles.box4]}>
                  {arrImage.map(image => {
                    return (
                      <Image
                        key={image.path}
                        style={styles.image}
                        source={{
                          uri: `${image.path}`,
                        }}
                      />
                    )
                  })}
                </View>
              </>
            ) : null}

            {arrVideo.length != 0 ? (
              <>
                <View style={styles.box5}>
                  <Text style={styles.label4}>Video</Text>
                  <Text
                    onPress={() => setArrVideo([])}
                    style={[styles.label4, { color: "red", marginLeft: "5%" }]}>
                    Xoá video
                  </Text>
                </View>
                <View style={styles.box4}>
                  {arrVideo.map(video => {
                    return (
                      <Image
                        key={video.path}
                        style={styles.image}
                        source={{
                          uri: `${video.path}`,
                        }}
                      />
                    )
                  })}
                </View>
              </>
            ) : null}

            <TouchableOpacity
              disabled={disabledButton}
              onPress={() => openModal("Bạn có muốn giao hàng?", 0)}
              style={styles.button}>
              <Text
                style={[
                  styles.label,
                  {
                    color: "white",
                    textTransform: "uppercase",
                    marginBottom: 0,
                  },
                ]}>
                Xác nhận giao
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openModal("Xác nhận khách trả lại hàng?", 1)}
              style={[styles.button, { backgroundColor: "red" }]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: "white",
                    textTransform: "uppercase",
                    marginBottom: 0,
                  },
                ]}>
                Khách trả lại
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
        onActPress={() => onActPress()}
        body={{
          type: "basic",
          title: { text: "Thông báo", style: { fontSize: 20 } },
          content: { text: alertContent },
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
    padding: 20,
  },
  label: {
    fontSize: FONTSIZE_LABEL,
    color: THEME_SUB_COLOR,
    marginBottom: "2.5%",
  },
  box: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  box2: {
    minWidth: "50%",
    padding: 5,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  label2: {
    fontSize: FONTSIZE_LABEL_2,
    fontWeight: "600",
    color: THEME_SUB_COLOR,
  },
  button: {
    width: "100%",
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  box3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  label3: {
    fontSize: 16,
    marginLeft: "5%",
    color: THEME_SUB_COLOR,
  },
  boxUpload: {
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "space-between",
  },
  buttonUpload: {
    width: "47.5%",
    height: 80,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  labelButtonUpload: {
    fontSize: 14,
    marginTop: "5%",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: "2%",
    marginTop: "2%",
  },
  box4: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: "5%",
  },
  label4: {
    fontSize: 15,
    marginTop: "5%",
    color: "white",
  },
  box5: {
    flexDirection: "row",
  },
})

export default PackageDeliveryScreen
