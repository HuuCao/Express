import React from "react"
import { Animated, Dimensions } from "react-native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

class Animation {
  setup() {
    return windowHeight
  }

  useAnimation(value) {
    return {
      start: () => {
        Animated.timing(value, {
          duration: 300,
          toValue: 0,
          useNativeDriver: true,
        }).start()
      },
      close: () => {
        Animated.timing(value, {
          duration: 300,
          toValue: windowHeight,
          useNativeDriver: true,
        }).start()
      },
    }
  }
}

export default new Animation()
