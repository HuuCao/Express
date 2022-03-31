import React from 'react'
import ReactExport from 'react-data-export'

//components antd
import { Button } from 'antd'

import { FileExcelOutlined } from '@ant-design/icons'
import { translate } from 'utils/i18n'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

export default ({ data, disabled }) => {
  return (
    <ExcelFile
      element={
        <Button
          size="large"
          icon={<FileExcelOutlined />}
          style={{
            backgroundColor: 'green',
            borderColor: 'green',
            color: 'white',
          }}
          disabled={disabled}
        >
          {translate('Export Excel')}
        </Button>
      }
    >
      <ExcelSheet data={data} name="Packages">
        <ExcelColumn label="PKG No" value="cartonNo" />
        <ExcelColumn label="PKG Type" value="pkgType" />
        <ExcelColumn label="NW" value="net" />
        <ExcelColumn label="GW" value="gross" />
        <ExcelColumn label="Height(cm)" value="height" />
        <ExcelColumn label="Width(cm)" value="width" />
        <ExcelColumn label="Real Weight" value="realWeight" />
        <ExcelColumn label="Volume" value="volume" />
        <ExcelColumn label="Length(cm)" value="length" />
        <ExcelColumn label="Number of item" value="numItem" />
        <ExcelColumn label="PCS" value="pcs" />
      </ExcelSheet>
    </ExcelFile>
  )
}
