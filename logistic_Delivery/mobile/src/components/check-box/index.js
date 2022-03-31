import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"

function CheckBox({ onChange, style, iconColor, disable, defaulValue }) {
  const [visible, setVisible] = useState(defaulValue || false)
  const _isCheckBox = () => {
    setVisible(!visible)
    onChange(!visible)
  }
  return (
    <TouchableWithoutFeedback onPress={() => disable ? null : _isCheckBox()}>
      <View style={[styles.container, style, {opacity: disable ? 0.3 : null}]}>
        <Entypo
          style={[{ display: !visible ? "none" : null }]}
          name="check"
          color={iconColor || "#1CC900"}
          size={20}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default CheckBox
