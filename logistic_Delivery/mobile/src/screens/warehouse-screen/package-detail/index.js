import React from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  PixelRatio,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native"
import FormOrderDetail from "./form-package-detail"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"

import { useDispatch, useSelector } from "react-redux"
import { updetePackageDetail } from "../../../actions"

import { useForm } from "react-hook-form"

import LoadingAction from "../../../components/loading"

const FONT_LABEL_TITLE = 23 / PixelRatio.getFontScale()
const FONT_LABEL_BUTTON = 18 / PixelRatio.getFontScale()
const FONT_LABEL = 16 / PixelRatio.getFontScale()

function PackageDetailWarehouseScreen({ route: { params }, navigation }) {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const { control, handleSubmit } = useForm()

  const update = store?.UpdatePackageDetailReducer
  const isLoading = update?.isLoading

  const data = params.data
  const fromScreen = params.fromScreen

  const listInput = [
    {
      key: 1,
      name: "weight",
      placeholder: "Real Weight",
      label: "Real Weight",
      defaultValue: data.realWeight,
      number: true
    },
  ]

  const onSubmit = value => {
    dispatch(
      updetePackageDetail({
        id: data.id,
        realWeight: value.weight,
      }, navigation, data.shipment.id, fromScreen),
    )
  }

  return (
    <LoadingAction isLoading={isLoading}>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset = {60}
          style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.halfScreen1}>
                <Text style={styles.labelTitle}>Hệ thống</Text>
                <Text style={styles.label}>
                  Real Weight: {data.realWeight} kg
                </Text>
                <Text style={styles.label}>
                  Gross Weight: {data.gross} kg
                </Text>
                <Text style={styles.label}>
                  Net Weight: {data.net} kg
                </Text>
                <Text style={styles.label}>
                  Số Lượng: {data.numItem}
                </Text>
                <Text style={styles.label}>
                  COD: {data.cod}
                </Text>
                <Text style={styles.label}>
                 Note: {data.note}
                </Text>
              </View>
              <View style={styles.halfScreen2}>
                <Text style={styles.labelTitle}>Thực tế</Text>
                <FormOrderDetail control={control} listInput={listInput} />
              </View>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={styles.button}>
                  <Text style={styles.labelButton}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "orange" }]}>
                  <Text style={styles.labelButton}>In Bill</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LoadingAction>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfScreen1: {
    padding: "5%",
  },
  halfScreen2: {
    flex: 1,
    padding: "5%",
  },
  labelTitle: {
    fontSize: FONT_LABEL_TITLE,
    fontWeight: "bold",
    color: THEME_SUB_COLOR,
  },
  boxButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "5%",
    marginBottom: "10%"
  },
  button: {
    width: "47.5%",
    borderRadius: 10,
    backgroundColor: "#316DE0",
    justifyContent: "center",
    padding: 10,
  },
  labelButton: {
    fontSize: FONT_LABEL_BUTTON,
    color: THEME_SUB_COLOR,
    alignSelf: "center",
  },
  label: {
    fontSize: FONT_LABEL,
    marginVertical: "5%",
    color: THEME_SUB_COLOR
  },
})

export default PackageDetailWarehouseScreen
