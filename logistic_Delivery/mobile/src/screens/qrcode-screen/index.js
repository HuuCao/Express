import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  PixelRatio,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native"
import { THEME_COLOR } from "../../utils/colors"
import { useForm, Controller } from "react-hook-form"

import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"

import { useDispatch, useSelector } from "react-redux"

import { fetchListPackageByShipmentIdQrcode } from "../../actions"

const WIDTH = Dimensions.get("window").width
const FONT_LABEL_BUTTON = 18 / PixelRatio.getFontScale()

function Qrcode({ navigation }) {
  const [loading, setLoading] = useState(
    Platform.OS == "android" ? true : false,
  )

  const [visible, setVisible] = useState(false)
  const [marginT, setMarginT] = useState(20)
  const [numScan, setNumScan] = useState(0)

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const role = store?.LoginReducer?.roleId

  const { control, handleSubmit } = useForm()

  let scanner

  const startScan = () => {
    if (scanner) {
      scanner._setScanning(false)
    }
  }

  useEffect(() => {
    if (scanner) {
      scanner._setScanning(false)
    }
  }, [scanner, numScan])

  const onSubmit = data => {
    if (visible) {
      if (role == 5) {
        if (data.shipment_id) {
          navigation.navigate("ListPackageScreen", {
            shipment_id: data.shipment_id,
          })
        } else {
          Alert.alert("Thông báo", "Vui lòng nhập mã shipment id")
        }
      } else if (role == 6) {
        if (!data.shipment_id) {
          Alert.alert("Thông báo", "Vui lòng nhập shipment id!")
          return
        } else if (!data.package_id) {
          Alert.alert("Thông báo", "Vui lòng nhập package id!")
          return
        } else {
          dispatch(
            fetchListPackageByShipmentIdQrcode({
              shipment_id: data.shipment_id,
              navigation: navigation,
              packageId: data.package_id,
            }),
          )
        }
      }
    } else {
      navigation.goBack()
    }
  }

  useEffect(() => {
    if (Platform.OS == "android") {
      setTimeout(() => {
        setLoading(false)
      }, 200)
    }
  })

  const onSuccess = e => {
    if (e.data) {
      const qrcode = JSON.parse(e.data)
      const shipment_id = qrcode.shipmentId
      const package_id = qrcode.packageId
      const status_shipment = qrcode.statusShipment
      if (role == 5) {
        if(status_shipment == "closed") {
          navigation.navigate("ListPackageScreen", { shipment_id: shipment_id })
        } else {
          Alert.alert("Thông báo", "Shipment không hợp lệ!")
        }
      } else if (role == 6) {
        dispatch(
          fetchListPackageByShipmentIdQrcode({
            shipment_id: shipment_id,
            navigation: navigation,
            packageId: package_id,
          }),
        )
      }
    }
    setTimeout(() => {
      setNumScan(numScan + 1)
    }, 1000)
  }

  const onReadQRCode = visible => {
    setVisible(!visible)
    if (visible) {
      setMarginT(20)
    } else {
      setMarginT(250)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.box}>
          <ActivityIndicator size="large" color={THEME_COLOR} />
        </View>
      ) : (
        <ScrollView>
          <QRCodeScanner
            onRead={onSuccess}
            ref={camera => (scanner = camera)}
            flashMode={RNCamera.Constants.FlashMode.auto}
            showMarker={true}
            permissionDialogTitle="Cấp quyền truy cập camera"
            permissionDialogMessage="Ứng dụng cần cấp quyền camera để sử dụng chức năng quét mã"
            buttonPositive="Cho phép"
            notAuthorizedView={
              <View style={{ padding: "5%" }}>
                <Text style={{ alignSelf: "center" }}>
                  Vui lòng cấp quyền cho camera để sử dụng chức năng quét mã:
                  vào cài đặt của điện thoại tìm tới tên ứng dụng và bật camera
                </Text>
              </View>
            }
            bottomContent={
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={60}
                style={{ marginBottom: marginT, width: "100%" }}>
                <View style={{ width: "100%", marginTop: Platform.OS == "android" ? "20%" : "0%"}}>
                  {/* <TouchableOpacity
                    onPress={() => startScan()}
                    style={styles.buttonTouchable}>
                    <Text>Nhấn để quét lại</Text>
                  </TouchableOpacity> */}
                  {visible && (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Nhập Shipment ID"
                          keyboardType="numeric"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="shipment_id"
                    />
                  )}
                  {visible && role == 6 ? (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Nhập Package ID"
                          keyboardType="numeric"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="package_id"
                    />
                  ) : null}
                  <View style={styles.boxButton}>
                    <TouchableOpacity
                      onPress={() => onReadQRCode(visible)}
                      style={styles.button}>
                      <Text style={styles.labelButton}>Nhập mã</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleSubmit(onSubmit)}
                      style={styles.button}>
                      <Text style={styles.labelButton}>Xong</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            }
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonTouchable: {
    padding: 16,
    alignSelf: "center",
    marginTop: Platform.OS == "ios" ? "10%" : "20%",
  },
  boxButton: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  button: {
    width: "47.5%",
    height: 50,
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    justifyContent: "center",
  },
  labelButton: {
    alignSelf: "center",
    color: "white",
    fontSize: FONT_LABEL_BUTTON,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
})

export default Qrcode
