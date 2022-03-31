import React from "react"
import { View, Text, StyleSheet, TextInput, PixelRatio } from "react-native"
import { Controller } from "react-hook-form"

import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../../utils/colors"

const FONT_LABEL = 18 / PixelRatio.getFontScale()

function FormPackageDetail({ listInput, control }) {
  return (
    <View style={styles.container}>
      {listInput.map(item => {
        return (
          <Controller
            key={item.key}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  style={styles.input}
                  keyboardType={"numeric"}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  placeholder={item.placeholder}
                />
                <Text style={styles.label}>{item.label}</Text>
              </View>
            )}
            name={item.name}
            defaultValue={`${item.defaultValue}`}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
  },
  input: {
    height: 50,
    width: "50%",
    borderWidth: 1,
    borderColor: THEME_COLOR,
    fontSize: 18,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    marginBottom: "5%",
    color: THEME_SUB_COLOR,
  },
  label: {
    fontSize: FONT_LABEL,
    position: "absolute",
    top: 15,
    color: THEME_SUB_COLOR
  },
})

export default FormPackageDetail
