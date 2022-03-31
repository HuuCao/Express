import { Modal, Table, Row } from 'antd';
import React from 'react';
export default function ImportModal(props) {
  const {
    visible,
    onCancel,
    onOk,
    columns,
    dataSource,
    downTemplate,
    actionComponent,
    importLoading,
  } = props;
  return (
    <Modal
      title={<a href={downTemplate}>template.xlsx</a>}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk || onCancel}
      width={1000}
      centered
    >
      {actionComponent && (
        <Row style={{ marginBottom: 15 }}>{actionComponent}</Row>
      )}

      <Table
        columns={columns}
        size="small"
        loading={importLoading}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
    </Modal>
  );
}
