import React, { Component } from "react"
import { View, Text, StyleSheet, PixelRatio } from "react-native"

function BasicModal({ title, content }) {
  return (
    <View>
      <Text style={styles.titleModal(title)}>{title?.text || ""}</Text>
      <Text style={styles.contentModal(content)}>{content?.text || ""}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleModal: title => {
    return {
      fontSize: 25 / PixelRatio.getFontScale(),
      fontWeight: "500",
      marginBottom: 10,
      ...(title?.style || null),
    }
  },
  contentModal: title => {
    return {
      fontSize: 16 / PixelRatio.getFontScale(),
      ...(title?.style || null),
    }
  },
})

export default BasicModal
