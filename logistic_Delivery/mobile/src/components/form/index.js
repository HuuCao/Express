import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native"
import { useForm, Controller } from "react-hook-form"

import { THEME_COLOR, THEME_SUB_COLOR, THEME_MAIN_COLOR } from "../../utils/colors"

function Form({
  listInput,
  onSubmit,
  styleButtonSubmit,
  labelSubmit,
  footer,
  style,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <View style={[styles.container, style]}>
      {listInput.map(item => {
        return (
          <View key={item.key} style={styles.boxForm}>
            {item.group ? (
              <View style={styles.groupInput(item.styleGroup)}>
                {item.listInputGroup.map(itemGroup => {
                  return (
                    <Controller
                      key={itemGroup.key}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View
                          style={styles.boxTextInput(itemGroup.styleBoxInput)}>
                          <TextInput
                            secureTextEntry={
                              item.name == "password" ||
                              item.name == "re_password"
                            }
                            style={styles.input(
                              itemGroup.iconPosition,
                              itemGroup.icon,
                              itemGroup.styleInput,
                              item.commonStyleInputGroup,
                            )}
                            placeholder={itemGroup?.placeholder || ""}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                          />
                          {itemGroup.icon ? (
                            <View
                              style={styles.boxIcon(
                                itemGroup.iconPosition,
                                itemGroup.styleBoxIcon,
                              )}>
                              {itemGroup.icon}
                            </View>
                          ) : null}
                        </View>
                      )}
                      name={itemGroup.name}
                    />
                  )
                })}
              </View>
            ) : (
              <Controller
                key={item.key}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.boxTextInput()}>
                    <TextInput
                      secureTextEntry={
                        item.name == "password" || item.name == "re_password"
                      }
                      style={styles.input(
                        item.iconPosition,
                        item.icon,
                        item.styleInput,
                      )}
                      placeholder={item?.placeholder || ""}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                    />
                    {item.icon ? (
                      <View
                        style={styles.boxIcon(
                          item.iconPosition,
                          item.styleBoxIcon,
                        )}>
                        {item.icon}
                      </View>
                    ) : null}
                  </View>
                )}
                name={item.name}
              />
            )}
          </View>
        )
      })}
      {footer}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonSubmit(styleButtonSubmit)}>
        <Text style={styles.textButonSubmit}>{labelSubmit || "Submit"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: "5%",
  },
  boxForm: {
    width: "100%",
  },
  boxTextInput: style => {
    return {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      ...style,
    }
  },
  input: (iconPosition, icon, style, commonStyleInput) => {
    return {
      width: "100%",
      height: "100%",
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.19)",
      fontSize: 18,
      zIndex: 3,
      backgroundColor: THEME_SUB_COLOR,
      ...((iconPosition == undefined && icon != undefined) ||
      (iconPosition == "start" && icon != undefined)
        ? {
            paddingStart: 60,
            paddingEnd: 20,
          }
        : iconPosition == "end" && icon != undefined
        ? {
            paddingStart: 20,
            paddingEnd: 60,
          }
        : {
            paddingStart: 20,
            paddingEnd: 20,
          }),
      ...commonStyleInput,
      ...style,
    }
  },
  boxIcon: (iconPosition, style) => {
    return {
      position: "absolute",
      width: 50,
      height: 50,
      zIndex: 2,
      justifyContent: "center",
      alignItems: "center",
      ...(iconPosition == undefined || iconPosition == "start"
        ? {
            left: 0,
            ...(style?.borderRadius == undefined
              ? {
                  borderTopStartRadius: 10,
                  borderBottomStartRadius: 10,
                }
              : null),
          }
        : iconPosition == "end"
        ? {
            right: 0,
            ...(style?.borderRadius == undefined
              ? { borderTopEndRadius: 10, borderBottomEndRadius: 10 }
              : null),
          }
        : null),
      ...style,
    }
  },
  groupInput: style => {
    return {
      width: "100%",
      minHeight: 50,
      ...style,
    }
  },
  buttonSubmit: style => {
    return {
      width: "100%",
      height: 50,
      backgroundColor: "#1CC900",
      justifyContent: "center",
      alignItems: "center",
      ...style,
    }
  },
  textButonSubmit: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
  },
})

export default Form
