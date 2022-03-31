import React, { useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PixelRatio,
  TouchableOpacity,
} from "react-native"

import { useDispatch, useSelector } from "react-redux"
import { fetchListClient } from "../../../actions"

const FONT_LABEL_TITLE = 30 / PixelRatio.getFontScale()
const FONT_LABEL = 16 / PixelRatio.getFontScale()

const Item = ({ item, navigation, onCloseModal }) => {
  const chooseClient = () => {
    setTimeout(() => navigation.navigate("PackageDeliveryScreen"), 200)
    onCloseModal()
  }
  return (
    <TouchableOpacity onPress={() => chooseClient()}>
      <View style={styles.containerItem}>
        <Text
          style={[
            styles.label,
            { marginBottom: 5 },
          ]}>{`Tên khách: ${item.name}`}</Text>
        <Text style={styles.label}>{`Số điện thoại: ${item.phone}`}</Text>
      </View>
    </TouchableOpacity>
  )
}

function ListClient({ navigation, onCloseModal }) {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const data = store?.ListClientReducer?.list

  useEffect(() => {
    dispatch(fetchListClient())
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.labelTitle}>Chọn khách</Text>
      <FlatList
        data={data || []}
        renderItem={({ item }) => (
          <Item
            item={item}
            onCloseModal={onCloseModal}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  containerItem: {
    padding: "5%",
    backgroundColor: "#eeeeee",
    marginBottom: "5%",
    borderRadius: 10,
  },
  labelTitle: {
    fontSize: FONT_LABEL_TITLE,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: FONT_LABEL,
  },
})

export default ListClient
