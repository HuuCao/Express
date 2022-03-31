import React from "react"
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import { THEME_COLOR } from "../../utils/colors"

const LABEL = 20 / PixelRatio.getFontScale()

function SuccessDeliveryScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <AntDesign name="checkcircleo" color={"#1CC900"} size={100} />
        <Text style={styles.label}>Giao hàng thành công</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainShipperScreen")}
          style={styles.button}>
          <Text
            style={[
              styles.label,
              { color: "white", textTransform: "uppercase", marginTop: 0 },
            ]}>
            Xác nhận giao
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  label: {
    fontSize: LABEL,
    marginTop: 20,
  },
  button: {
    width: "100%",
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
})

export default SuccessDeliveryScreen
