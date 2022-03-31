import React, { useState, useEffect } from 'react';
import { Input, Button, Row } from 'antd';
import { translate } from 'utils/i18n';
import { debound } from "../../utils";

export default ({
  onClickSearch,
  setItems,
  items,
  resetForm
}) => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resetForm) {
      setTextInput("")
    }
  }, [resetForm])

  const _onChangeText = ({ target: { value } }) => {
    setTextInput(value)
    if (!items.data) {
      setItems({
        data: [],
        loading: false
      })
    }
  }

  const _onClick = async () => {

    setLoading(true)
    await onClickSearch(textInput)
    setLoading(false)
  }

  return (
    <Row
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Input
        autoFocus
        value={textInput}
        onChange={_onChangeText}
        placeholder={translate("JANcode")}
        onPressEnter={_onClick}
        style={{
          flex: 1,
          marginRight: 8
        }}
      />
      <Button size="small"
        type="primary"
        onClick={_onClick}
        loading={loading}
      >
        {translate("Search")}
      </Button>
    </Row>
  )
}