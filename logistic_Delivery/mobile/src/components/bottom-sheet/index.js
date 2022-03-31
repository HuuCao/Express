import React from "react"
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Text,
  PixelRatio,
  TouchableOpacity,
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"

function BottomSheet({
  visible,
  onClose,
  valueAnimation,
  onCloseTopRightIconColor,
  onCloseTouchOutSide,
  onCloseTopRight,
  children,
  style,
}) {
  const transform = { transform: [{ translateY: valueAnimation }] }
  const onCloseTouchOutSideBottomSheet =
    onCloseTouchOutSide == undefined ? true : onCloseTouchOutSide
  const onCloseTopRightBottomSheet =
    onCloseTopRight == undefined ? true : onCloseTopRight
  return (
    <Modal
      visible={visible}
      transparent={true}
      supportedOrientations={[
        "portrait",
        "portrait-upside-down",
        "landscape",
        "landscape-left",
        "landscape-right",
      ]}>
      <TouchableWithoutFeedback
        onPress={() => (onCloseTouchOutSideBottomSheet ? onClose() : null)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.boxBottomSheet(style), transform]}>
              {onCloseTopRightBottomSheet ? (
                <View style={styles.boxHeaderBottomSheet}>
                  <TouchableOpacity onPress={() => onClose()}>
                    <View style={styles.IconCloseHeaderBottomSheet}>
                      <AntDesign
                        name="closecircle"
                        color={onCloseTopRightIconColor || "red"}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View
                style={styles.boxBodyBottomSheet(onCloseTopRightBottomSheet)}>
                {children}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  boxBottomSheet: style => {
    return {
      backgroundColor: "white",
      minHeight: "50%",
      width: "100%",
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      ...(style || null),
    }
  },
  boxBodyBottomSheet: value => {
    return {
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: value ? 0 : 20,
    }
  },
  boxHeaderBottomSheet: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 5,
  },
  IconCloseHeaderBottomSheet: {
    height: PixelRatio.getPixelSizeForLayoutSize(10),
    width: PixelRatio.getPixelSizeForLayoutSize(10),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5),
    justifyContent: "center",
    alignItems: "center",
  },
})

export default BottomSheet
