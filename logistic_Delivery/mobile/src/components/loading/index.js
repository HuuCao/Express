import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, ActivityIndicator, Modal } from "react-native"
import { THEME_COLOR, THEME_MAIN_COLOR, THEME_SUB_COLOR } from "../../utils/colors"
import Ionicons from "react-native-vector-icons/Ionicons"

const LoadingAction = ({ children, isLoading, progressBar, messageIsDone }) => {
  return (
    <>
      {isLoading ? (
        <Modal transparent={true} visible={true}>
          <View style={styles.container}>
            {progressBar >= 100 ? (
              <Ionicons
                name="ios-checkmark-circle"
                color={THEME_COLOR}
                size={80}
              />
            ) : (
              <ActivityIndicator size="small" color={THEME_COLOR} />
            )}

            {progressBar ? (
              <Text style={styles.progressBar}>{`${progressBar}%`}</Text>
            ) : null}

            {progressBar >= 100 && messageIsDone ? (
              <Text style={styles.done}>{messageIsDone || null}</Text>
            ) : null}
          </View>
        </Modal>
      ) : (
        children
      )}
    </>
  )
}

export default LoadingAction

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_MAIN_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    color: THEME_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "10%",
  },
  done: {
    color: THEME_COLOR,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "5%",
  },
})
