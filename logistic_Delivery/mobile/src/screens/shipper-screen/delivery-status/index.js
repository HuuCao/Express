import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  PixelRatio,
  TouchableOpacity,
} from "react-native"

const FONT_LABEL = 50 / PixelRatio.getFontScale()
const FONT_LABEL_1 = 20 / PixelRatio.getFontScale()

function DeliveryStatusScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.label}>Bạn đang giao hàng</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonLabel}>Huỷ bỏ hành động</Text>
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
  box: {
    width: "100%",
    padding: "10%",
    backgroundColor: "#E0F3DC",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: FONT_LABEL,
  },
  button: {
    padding: "5%",
    backgroundColor: "red",
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: FONT_LABEL_1,
    color: "white",
  },
})

export default DeliveryStatusScreen
