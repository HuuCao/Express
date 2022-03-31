import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  PixelRatio,
  TouchableOpacity,
} from "react-native"
import { THEME_COLOR } from "../../../utils/colors"

const FONT_LABEL = 30 / PixelRatio.getFontScale()
const FONT_LABEL_1 = 20 / PixelRatio.getFontScale()
const FONT_LABEL_2 = 40 / PixelRatio.getFontScale()

function WalletDetail({ route }) {
  const { name, avata, proceeds } = route.params
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            style={styles.avata}
            source={{
              uri: avata,
            }}
          />
          <Text style={styles.label}>{name}</Text>
        </View>
        <Text style={styles.proceeds}>{`Số tiền thu: ${proceeds} VNĐ`}</Text>
        <View style={styles.box2}>
          <Text style={styles.label2}>{`${proceeds} VNĐ`}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.labelButton}>Thu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    justifyContent: "center",
  },
  box: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  avata: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  label: {
    fontSize: FONT_LABEL,
    marginLeft: "5%",
  },
  proceeds: {
    fontSize: FONT_LABEL_1,
    alignSelf: "center",
  },
  box2: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#E8E8E8",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label2: {
    fontSize: FONT_LABEL_2,
    fontWeight: "bold",
  },
  button: {
    width: "40%",
    minHeight: 50,
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    fontSize: FONT_LABEL_1,
  },
})

export default WalletDetail
