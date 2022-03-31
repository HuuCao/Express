import React from "react"
import {
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native"

import { THEME_COLOR, THEME_MAIN_COLOR } from "../../../utils/colors"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import Icon1 from "../../../assets/images/icon_nhaphang-01-01-01.png"
import Icon2 from "../../../assets/images/icon_giaohang-01-01.png"
import Icon3 from "../../../assets/images/icon_xulyhangtrave-01.png"

const FONT_LABEL = 16 / PixelRatio.getFontScale()

function WarehouseScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ImportWarehouseScreen")}
          style={styles.boxButton}>
          <Image 
            style={{ width: 60, height: 60, borderRadius: 15, marginRight: "5%" }} source={Icon1}
          />
          <Text style={styles.label}>Nhập hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DeliveryListWarehouseScreen")}
          style={styles.boxButton}>
          <Image 
            style={{ width: 60, height: 60, borderRadius: 15, marginRight: "5%" }} source={Icon2}
          />
          <Text style={styles.label}>Chọn shipper giao hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ListReturnPackageScreen")}
          style={styles.boxButton}>
          <Image 
            style={{ width: 60, height: 60, borderRadius: 15, marginRight: "5%" }} source={Icon3}
          />
          <Text style={styles.label}>Xử lí hàng trả về</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    justifyContent: "center",
  },
  boxButton: {
    padding: "5%",
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    marginBottom: "5%",
    flexDirection: "row",
    alignSelf: "center",
    width: "95%"
  },
  label: {
    fontSize: FONT_LABEL,
    alignSelf: "center",
    fontWeight: "bold"
  },
})

export default WarehouseScreen
