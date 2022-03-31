import React from "react"
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  PixelRatio,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import BasicModal from "./basic"

const windowHeight = Dimensions.get("window").height

function ModalComponent({
  visible,
  onClose,
  onCloseTouchOutSide,
  onCloseTopRight,
  body,
  valueAnimation,
  useAnimation,
  typeAnimation,
  footer,
  labelButtonBottom,
  onCloseTopRightIconColor,
  onActPress,
  typeButtonBottom,
  style,
}) {
  const onCloseTouchOutSideModal =
    onCloseTouchOutSide == undefined ? true : onCloseTouchOutSide
  const onCloseTopRightModal =
    onCloseTopRight == undefined ? true : onCloseTopRight
  const bodyModal = body == undefined ? { type: "basic" } : body
  let valueAnimationModal = valueAnimation == undefined ? 1 : valueAnimation
  valueAnimationModal =
    useAnimation == undefined ? 1 : useAnimation ? valueAnimationModal : 1
  const footerModal = footer == undefined ? true : footer
  const typeButtonBottomModal =
    typeButtonBottom == undefined ? "full" : typeButtonBottom

  let transform = {}

  switch (typeAnimation) {
    case "scale":
      transform = { transform: [{ scale: valueAnimationModal }] }
      break
    case "bottomToTop":
      transform = { transform: [{ translateY: valueAnimationModal }] }
      break
    case "topToBottom":
      transform = { transform: [{ translateY: valueAnimationModal }] }
      break
    case "leftToRight":
      transform = { transform: [{ translateX: valueAnimationModal }] }
      break
    case "rightToLeft":
      transform = { transform: [{ translateX: valueAnimationModal }] }
      break
    default:
      transform = {}
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      supportedOrientations={[
        "portrait",
        "portrait-upside-down",
        "landscape",
        "landscape-left",
        "landscape-right",
      ]}>
      <TouchableWithoutFeedback
        onPress={() => (onCloseTouchOutSideModal ? onClose() : null)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalView(style), transform]}>
              {onCloseTopRightModal ? (
                <View style={styles.boxIconCloseHeaderModal}>
                  <TouchableWithoutFeedback onPress={() => onClose()}>
                    <View style={styles.IconCloseHeaderModal}>
                      <AntDesign
                        name="closecircle"
                        color={onCloseTopRightIconColor || "red"}
                        size={20}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ) : null}
              <View style={styles.boxBodyModal(onCloseTopRightModal)}>
                {bodyModal.type == "basic" ? (
                  <BasicModal
                    title={bodyModal.title}
                    content={bodyModal.content}
                  />
                ) : null}
                {bodyModal.type == "custom"
                  ? bodyModal.customModal || null
                  : null}
              </View>
              {footerModal ? (
                <View
                  style={styles.boxBottomButtonModal(typeButtonBottomModal)}>
                  {typeButtonBottomModal == "onlyAct" ||
                  typeButtonBottomModal == "full" ? (
                    <TouchableOpacity
                      onPress={() =>
                        onActPress != undefined ? onActPress() : null
                      }
                      style={[
                        styles.bottomButtonModal,
                        { ...labelButtonBottom?.onAct?.styleButton },
                      ]}>
                      <Text
                        style={styles.textBottomButtonActModal(
                          labelButtonBottom,
                        )}>
                        {labelButtonBottom?.onAct?.label || "OK"}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {typeButtonBottomModal == "onlyCancel" ||
                  typeButtonBottomModal == "full" ? (
                    <TouchableOpacity
                      onPress={() => onClose()}
                      style={[
                        styles.bottomButtonModal,
                        { ...labelButtonBottom?.onCancel?.styleButton },
                      ]}>
                      <Text
                        style={styles.textBottomButtonCancelModal(
                          labelButtonBottom,
                        )}>
                        {labelButtonBottom?.onCancel?.label || "Cancel"}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: style => {
    return {
      backgroundColor: "white",
      borderRadius: 10,
      minHeight: "1%",
      width: "90%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      ...(style || null),
    }
  },
  boxIconCloseHeaderModal: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 5,
  },
  boxBodyModal: onCloseTopRightModal => {
    return {
      paddingTop: onCloseTopRightModal ? 0 : 25,
      paddingHorizontal: 25,
      paddingBottom: 25,
    }
  },
  IconCloseHeaderModal: {
    height: PixelRatio.getPixelSizeForLayoutSize(10),
    width: PixelRatio.getPixelSizeForLayoutSize(10),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5),
    justifyContent: "center",
    alignItems: "center",
  },
  boxBottomButtonModal: type => {
    return {
      width: "100%",
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
      paddingHorizontal: 25,
      flexDirection: "row",
      justifyContent: type != "full" ? "flex-end" : "space-between",
      paddingBottom: 25,
    }
  },
  bottomButtonModal: {
    padding: 10,
    width: "45%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textBottomButtonActModal: labelButtonBottom => {
    return {
      fontSize:
        labelButtonBottom?.onAct?.style?.fontSize ||
        15 / PixelRatio.getFontScale(),
      ...(labelButtonBottom?.onAct?.style || null),
    }
  },
  textBottomButtonCancelModal: labelButtonBottom => {
    return {
      fontSize:
        labelButtonBottom?.onCancel?.style?.fontSize ||
        15 / PixelRatio.getFontScale(),
      ...(labelButtonBottom?.onCancel?.style || null),
    }
  },
})

export default ModalComponent
