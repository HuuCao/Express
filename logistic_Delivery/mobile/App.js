import React, {useEffect, useState, useRef} from "react"
import {View, Text, TouchableOpacity, Animated, StatusBar} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {Provider} from "react-redux"
import configureStore from "./src/redux/configureStore"
import {ROUTER} from "./src/router"
import SplashScreen from "react-native-splash-screen"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {THEME_COLOR, THEME_MAIN_COLOR} from "./src/utils/colors"

import Modal from "./src/components/modal"
import AnimationModal from "./src/components/modal/animation"

import AsyncStorage from "@react-native-community/async-storage"

const store = configureStore()
const Stack = createStackNavigator()

function App() {
  const [visibleModal, setVisibleModal] = useState(false)
  const [navigation, setNavigation] = useState(null)
  const setup = AnimationModal.setup("scale")
  const valueAnimation = useRef(new Animated.Value(setup.value)).current

  const openModal = navigation => {
    setNavigation(navigation)
    setVisibleModal(!visibleModal)
    AnimationModal.scale(valueAnimation).start()
  }

  const closeModal = () => {
    setTimeout(() => setVisibleModal(!visibleModal), 200)
    AnimationModal.scale(valueAnimation).close()
  }

  const onActPress = () => {
    logout()
    closeModal()
    navigation.replace("LoginScreen")
  }

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const logout = async () => {
    await AsyncStorage.removeItem("__token")
  }

  return (
    <Provider store={store}>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: THEME_COLOR,
            },
          }}>
          {ROUTER.map(router => {
            return (
              <Stack.Screen
                key={router.key}
                name={router.name}
                component={router.component}
                options={({navigation, route}) => ({
                  ...{
                    headerLeft: props => (
                      <View style={{flexDirection: "row", marginLeft: "15%"}}>
                        <TouchableOpacity
                          {...props}
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: "white",
                            borderRadius: 999,
                            justifyContent: "center",
                            alignItems: "center",
                            display: !router.headerLeftVisible ? null : "none",
                          }}
                          onPress={() => {
                            navigation.goBack()
                          }}>
                          <Ionicons
                            name="chevron-back"
                            color={THEME_MAIN_COLOR}
                            size={20}
                          />
                        </TouchableOpacity>
                        <FontAwesome
                          onPress={() => openModal(navigation)}
                          style={{
                            marginRight: "15%",
                            display: router?.iconLogout ? null : "none",
                          }}
                          name={"power-off"}
                          color={THEME_MAIN_COLOR}
                          size={25}
                        />
                      </View>
                    ),
                    headerRight: props => (
                      <FontAwesome
                        onPress={() =>
                          router?.headerRightMove == undefined
                            ? null
                            : navigation.navigate(router.headerRightMove)
                        }
                        style={{
                          marginRight: "15%",
                          display: router.headerRight ? null : "none",
                        }}
                        name={router.headerRightIcon}
                        color={THEME_MAIN_COLOR}
                        size={25}
                      />
                    ),
                  },
                  ...router.options,
                })}
              />
            )
          })}
        </Stack.Navigator>
      </NavigationContainer>
      <Modal
        visible={visibleModal}
        onClose={() => closeModal()}
        onCloseTouchOutSide={true}
        onCloseTopRight={true}
        valueAnimation={valueAnimation}
        useAnimation={true}
        typeAnimation={setup.type}
        footer={true}
        onActPress={() => onActPress()}
        body={{
          type: "basic",
          title: {text: "Thông báo", style: {fontSize: 20}},
          content: {text: "Bạn có muốn đăng xuất?"},
        }}
        labelButtonBottom={{
          onAct: {
            label: "Đồng ý",
            style: {
              color: "white",
            },
            styleButton: {
              backgroundColor: THEME_COLOR,
            },
          },
          onCancel: {
            label: "Huỷ",
            style: {
              color: "white",
            },
            styleButton: {
              backgroundColor: "red",
            },
          },
        }}
      />
    </Provider>
  )
}

export default App
