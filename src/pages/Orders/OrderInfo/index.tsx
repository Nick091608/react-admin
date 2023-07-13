import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  orderId: string;
  name: string;
  times: string;
  send: string;
  status: string;
}

export default () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '下单时间',
      dataIndex: 'times',
      key: 'times',
    },
    {
      title: '赠送课程',
      dataIndex: 'send',
      key: 'send',
    },
    {
      title: '支付状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>查看</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  
  const dataSource: DataType[] = [];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
