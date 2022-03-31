import React from "react"
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { ListInput } from "./list-input"
import Form from "../../components/form"
import { THEME_COLOR } from "../../utils/colors"

const FONTSIZE_TITLE_SCREEN = 25 / PixelRatio.getFontScale()
const FONTSIZE_LABEL = 16 / PixelRatio.getFontScale()

function Register({ navigation }) {
  const _onSubmit = data => {
    console.log(data)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.titleScreen}>Tạo tài khoản</Text>
            <Form
              listInput={ListInput}
              onSubmit={_onSubmit}
              labelSubmit="Đăng ký"
              styleButtonSubmit={{
                width: "50%",
                alignSelf: "center",
                borderRadius: 10,
              }}
            />
            <Text style={styles.or}>Hoặc</Text>
            <View style={styles.boxLabel}>
              <Text style={styles.registerLabel}>
                Đã có tài khoản của bạn?{" "}
              </Text>
              <Text
                onPress={() => navigation.navigate("LoginScreen")}
                style={styles.registerLabel}>
                Đăng nhập
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleScreen: {
    color: THEME_COLOR,
    marginVertical: 40,
    fontSize: FONTSIZE_TITLE_SCREEN,
  },
  or: {
    fontSize: FONTSIZE_LABEL,
    marginVertical: 20,
  },
  registerLabel: {
    fontSize: FONTSIZE_LABEL,
  },
  boxLabel: {
    flexDirection: "row",
  },
})

export default Register
