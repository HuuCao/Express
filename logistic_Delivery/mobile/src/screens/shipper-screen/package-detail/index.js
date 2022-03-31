import React, {useEffect} from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"

import { useDispatch, useSelector } from "react-redux"
import { updetePackageDetail } from "../../../actions"

import LoadingAction from "../../../components/loading"

import { StringToVND, VNDToString } from "../../../utils/currency-unit"

const Form = ({ list, control }) => {
  return (
    <>
      {list.map(item => {
        return (
          <View key={item.key} style={styles.containerForm}>
            <Text style={styles.labelForm}>{item.label}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name={item.name}
            />
            <Text style={styles.labelUnit}>{item.unit}</Text>
          </View>
        )
      })}
    </>
  )
}

const PackageDetail = ({ route: { params }, navigation }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const isLoading = store?.UpdatePackageDetailReducer?.isLoading
  const { control, handleSubmit } = useForm()
  const onSubmit = data => {
    dispatch(
      updetePackageDetail({
        id: params.id,
        realWeight: data.weight,
      }),
    )
  }

  const data = params.data

  const list = [
    {
      key: 1,
      name: "weight",
      label: `Cân nặng: ${data.realWeight} Kg`,
      unit: "Kg",
    },
  ]
  return (
    <LoadingAction isLoading={isLoading}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.body}>
              <Text style={[styles.labelTitle, { marginBottom: "5%" }]}>Thông tin của kiện hàng</Text>
              <Text style={styles.label}>Số tiền cần thu: {StringToVND(data.fee.cod)}</Text>
              <Text style={styles.label}>Cân nặng: {data.realWeight} (kg)</Text>
              <Text style={styles.label}>Khối lượng thô: {data.gross} (kg)</Text>
              <Text style={styles.label}>Khối lượng tịnh: {data.net} (kg)</Text>
              <Text style={styles.label}>Thể tích: {data.volume} (m3)</Text>
              <Text style={styles.label}>Chiều dài: {data.length} (m)</Text>
              <Text style={styles.label}>Chiều cao: {data.height} (m)</Text>
              <Text style={styles.label}>Số lượng: {data.numItem} </Text>
              <Text style={styles.label}>Thể tích: {data.volume} </Text>
              <Text style={styles.label}>Chú thích: {data.note} </Text>
              <Text style={[styles.labelTitle, { marginTop: "10%", marginBottom: "5%" }]}>
                Thông tin người nhân
              </Text>
              <Text style={styles.label}>Tên: {data?.pkg_receiver?.customer_receiver?.name || data?.cneeName}</Text>
              <Text style={styles.label}>Địa chỉ: {data?.pkg_receiver?.customer_receiver?.address || data?.cneeAddress}</Text>
              <Text style={styles.label}>Số điện thoại: {data?.pkg_receiver?.customer_receiver?.tel || data?.cneePhone}</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LoadingAction>
  )
}

export default PackageDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_MAIN_COLOR
  },
  body: {
    flex: 1,
    padding: "5%",
  },
  labelTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: THEME_SUB_COLOR
  },
  input: {
    width: "35%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: "5%",
  },
  containerForm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
  labelForm: {
    fontSize: 15,
    flex: 1,
    paddingRight: "5%",
  },
  labelUnit: {
    fontSize: 15,
    width: "10%",
    marginLeft: "5%",
  },
  label: {
    fontSize: 17,
    marginTop: "5%",
    color: THEME_SUB_COLOR
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: THEME_COLOR,
    marginVertical: "5%",
    borderRadius: 10,
    justifyContent: "center",
  },
  labelButton: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
})
