import React, { useState } from 'react';

//components antd
import { Modal, Button, Checkbox } from 'antd';
import { translate } from 'utils/i18n';

export default function SettingColumns({
  columnsRender,
  columns,
  setColumns,
  nameColumn,
  width,
  buttonProps = {},
}) {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  return (
    <>
      <Button type="primary" {...buttonProps} onClick={toggle}>
        {translate('Setting columns')}
      </Button>
      <Modal
        width={width}
        title={translate('Setting columns')}
        visible={visible}
        footer={null}
        onCancel={toggle}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {columnsRender.map((e, index) => (
            <div style={{ width: '33.333333%', marginBottom: 10 }}>
              <Checkbox
                defaultChecked={
                  columns.filter((v) => v.title === e.title).length
                }
                onChange={(event) => {
                  let columnsNew = [...columns];

                  if (event.target.checked) {
                    columnsNew.splice(index, 0, { ...e });
                  } else {
                    const indexHidden = columns.findIndex(
                      (c) => c.title === e.title
                    );
                    columnsNew.splice(indexHidden, 1);
                  }

                  //lưu setting columns lên localstorage
                  localStorage.setItem(nameColumn, JSON.stringify(columnsNew));

                  setColumns([...columnsNew]);
                }}
              >
                {e.title}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
