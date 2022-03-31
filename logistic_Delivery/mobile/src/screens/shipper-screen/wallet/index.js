import React, { useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  PixelRatio,
  SafeAreaView,
} from "react-native"
import { StringToVND, VNDToString } from "../../../utils/currency-unit"

import { useDispatch, useSelector } from "react-redux"
import { fetchWalletDetailShipper } from "../../../actions"

import LoadingAction from "../../../components/loading"

const FONT_LABEL = 40 / PixelRatio.getFontScale()
const FONT_LABEL_1 = 30 / PixelRatio.getFontScale()

function WalletScreen({ navigation }) {
  const dispatch = useDispatch()
  const store = useSelector(state => state)

  const isLoading = store.fetchWalletDetailShipper?.isLoading
  const data = store.fetchWalletDetailShipper?.data

  useEffect(() => {
    dispatch(fetchWalletDetailShipper())
  }, [])

  return (
    <LoadingAction isLoading={isLoading}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.label}>Số tiền thu</Text>
          <View style={styles.box}>
            <Text style={styles.label2}>{StringToVND(data?.codSum || 0)}</Text>
          </View>
        </View>
      </SafeAreaView>
    </LoadingAction>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: FONT_LABEL,
    fontWeight: "bold",
  },
  box: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  label2: {
    fontSize: FONT_LABEL_1,
  },
})

export default WalletScreen
