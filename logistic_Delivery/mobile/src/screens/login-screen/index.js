import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Form from "../../components/form"
import { ListInput } from "./list-input"
import { loginAction } from "../../actions"
import {
  THEME_COLOR,
  THEME_MAIN_COLOR,
  THEME_SUB_COLOR,
} from "../../utils/colors"
import LoadingAction from "../../components/loading"

const icon_logo = require("assets/images/logo_driver.png")
const FONTSIZE_TITLE_SCREEN = 25 / PixelRatio.getFontScale()
const FONTSIZE_GET_PASSWORD = 18 / PixelRatio.getFontScale()
const FONTSIZE_LABEL = 16 / PixelRatio.getFontScale()

function Login({ navigation }) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const isLoading = data?.LoginReducer?.isLoading

  const onSubmit = data => {
    dispatch(loginAction({ ...data, ...{ navigation: navigation } }))
  }
  const _getPassword = () => {
    return <Text style={styles.getPassword}>Quên mật khẩu ?</Text>
  }

  return (
    <LoadingAction isLoading={isLoading}>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_MAIN_COLOR }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.boxlogoApp}>
                <Image
                  source={icon_logo}
                  resizeMode={"contain"}
                  style={{ height: 140, width: 200, alignSelf: "center" }}
                />
              </View>
              <Text style={styles.titleScreen}>Đăng nhập</Text>
              <Form
                listInput={ListInput}
                onSubmit={onSubmit}
                labelSubmit="Đăng nhập"
                styleButtonSubmit={{
                  width: "50%",
                  alignSelf: "center",
                  borderRadius: 10,
                  backgroundColor: THEME_COLOR,
                }}
                footer={_getPassword()}
              />
              {data.LoginReducer.login !== true &&
              data.LoginReducer.login !== null ? (
                <Text style={styles.messageLogin}>
                  {data.LoginReducer.message}
                </Text>
              ) : null}
            </View>
          </ScrollView>
          <Text
            style={{
              color: "white",
              position: "absolute",
              bottom: "5%",
              width: "100%",
              textAlign: "center",
            }}>
            {"version 1.0.0"}
          </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LoadingAction>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boxlogoApp: {
    width: 200,
    height: 120,
    alignSelf: "center",
    margin: 10,
  },
  titleScreen: {
    color: THEME_SUB_COLOR,
    marginVertical: 40,
    fontSize: FONTSIZE_TITLE_SCREEN,
  },
  getPassword: {
    textAlign: "right",
    marginBottom: 20,
    fontSize: FONTSIZE_GET_PASSWORD,
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
  messageLogin: {
    fontSize: FONTSIZE_LABEL,
    color: "red",
    marginTop: 20,
  },
})

export default Login
