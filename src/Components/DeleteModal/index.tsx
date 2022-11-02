import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteProp {
  title: string;
  name?: string;
  handleOk?: any;
  isDeleteItem?: boolean;
  isDisable?: boolean;
}
const DeleteModal: React.FC<DeleteProp> = ({
  title,
  handleOk,
  name,
  isDeleteItem,
  isDisable = false,
}) => {
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      centered: true,
      cancelText: "No",
      onOk: () => handleOk(),
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {isDeleteItem ? (
        <Button key="1" type="primary" onClick={showDeleteConfirm}>
          {name}
        </Button>
      ) : (
        <Button
          danger
          icon={<DeleteOutlined />}
          disabled={isDisable ? true : false}
          onClick={(e) => {
            e.stopPropagation();
            showDeleteConfirm();
          }}
        />
      )}
    </>
  );
};

export default DeleteModal;
