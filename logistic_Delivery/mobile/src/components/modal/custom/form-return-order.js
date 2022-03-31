import React from "react"
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  PixelRatio,
} from "react-native"
import { useForm, Controller } from "react-hook-form"

const FONT_LABEL = 16 / PixelRatio.getFontScale()
const FONT_TITLE = 20 / PixelRatio.getFontScale()

function FormReturnOrder() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => console.log(data)
  return (
    <View>
      <Text style={styles.title}>Lý do trả hàng</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            multiline={true}
            onChangeText={value => onChange(value)}
            value={value}
            blurOnSubmit={false}
          />
        )}
        name="content"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.19)",
    borderRadius: 10,
    padding: 10,
    fontSize: FONT_LABEL,
  },
  title: {
    fontSize: FONT_TITLE,
    fontWeight: "700",
    marginBottom: 20,
  },
})

export default FormReturnOrder
