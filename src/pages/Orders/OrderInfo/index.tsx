import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Form, Input, Button } from "antd";
import tools from "@/util/tools";

import { orderQuery } from "@/api/order";

import "./index.less";

const OrderInfo: React.FC = () => {
  const columns = [
    {
      title: "订单号",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "课程名称",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "下单时间",
      dataIndex: "buyTime",
      key: "buyTime",
    },
    {
      title: "赠送课程",
      dataIndex: "courseCost",
      key: "courseCost",
    },
    {
      title: "支付状态",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => {
        return record.status === 0 ? (
          <Tag color="green">已支付</Tag>
        ) : (
          <Tag>未支付</Tag>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => {
        console.log(_, record);
        return (
          <Space size="middle">
            <a
              onClick={() => {
                editHandler(record);
              }}
            >
              编辑
            </a>
            <a>删除</a>
          </Space>
        );
      },
    },
  ];

  const [form] = Form.useForm();
  const [dataList, setDataList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getOrderQuery();
  }, []);

  const getOrderQuery = async () => {
    const userinfo = JSON.parse(
      tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
    );
    const res = await orderQuery({
      mobile: userinfo.userBasicInfo?.username || "",
      userId: userinfo.userBasicInfo?.id || "",
    });
    res && setDataList(res?.data || []);
  };

  const editHandler = (record: any) => {
    console.log(record, "编辑");
    setIsModalOpen(true);
    form.setFieldsValue({ ...record });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Table dataSource={dataList} columns={columns} pagination={false} />
      <Modal
        title="修改订单信息"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item label="订单号" name="orderId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="课程名称" name="courseName">
            <Input />
          </Form.Item>
          <Form.Item label="下单时间" name="buyTime">
            <Input disabled />
          </Form.Item>
          <Form.Item label="赠送课程" name="courseCost">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button onClick={handleCancel} className="cancel">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderInfo;
