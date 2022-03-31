import React from "react"
import { Animated, Dimensions } from "react-native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

class Animation {
  setup(value) {
    switch (value) {
      case "scale":
        return { value: 0, type: value }
      case "topToBottom":
        return { value: -windowHeight, type: value }
      case "bottomToTop":
        return { value: windowHeight, type: value }
      case "leftToRight":
        return { value: -windowWidth, type: value }
      case "rightToLeft":
        return { value: windowWidth, type: value }
      default:
        return { value: 0, type: "scale" }
    }
  }

  bottomToTop(value) {
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

  topToBottom(value) {
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
          toValue: -windowHeight,
          useNativeDriver: true,
        }).start()
      },
    }
  }

  leftToRight(value) {
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
          toValue: -windowWidth,
          useNativeDriver: true,
        }).start()
      },
    }
  }

  rightToLeft(value) {
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
          toValue: windowWidth,
          useNativeDriver: true,
        }).start()
      },
    }
  }

  scale(value, config) {
    const toValueStart =
      config == undefined
        ? 1
        : config.start == undefined
        ? 1
        : config.start.toValue == undefined
        ? 1
        : config.start.toValue
    const toValueClose =
      config == undefined
        ? 0
        : config.close == undefined
        ? 0
        : config.close.toValue == undefined
        ? 0
        : config.close.toValue
    const durationStart =
      config == undefined
        ? 300
        : config.start == undefined
        ? 300
        : config.start.duration == undefined
        ? 300
        : config.start.duration
    const durationClose =
      config == undefined
        ? 300
        : config.close == undefined
        ? 300
        : config.close.duration == undefined
        ? 300
        : config.close.duration
    return {
      start: () => {
        Animated.spring(value, {
          toValue: toValueStart,
          duration: durationStart,
          useNativeDriver: true,
        }).start()
      },
      close: () => {
        Animated.timing(value, {
          toValue: toValueClose,
          duration: durationClose,
          useNativeDriver: true,
        }).start()
      },
    }
  }
}

export default new Animation()
