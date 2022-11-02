import { Button, Form, Input, message, Modal, Upload, UploadFile } from "antd";
import React, { useMemo, useState } from "react";
import styles from "./styles.module.less";
import { UploadOutlined } from "@ant-design/icons";
import { EditDocument } from "../../../Services/Users";
import { useParams } from "react-router-dom";

interface EditDocProp {
  modalVisible: boolean;
  handleClose: () => void;
  editingFileData: {
    docId: string;
    docName: string;
  };
}
const EditDocumentModal: React.FC<EditDocProp> = ({
  modalVisible,
  handleClose,
  editingFileData,
}) => {
  let { id }: any = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  form.setFieldsValue({
    EditFile: null,
    EditFileName: editingFileData.docName,
  });

  const onEditDocumentFinish = async (values: any) => {
    const editdocfd = new FormData();

    editdocfd.append("name", values.EditFileName);
    values.EditFile && editdocfd.append("document", values.EditFile.file);
    editdocfd.append("_id", editingFileData.docId);
    try {
      setLoading(true);
      await EditDocument(id, editdocfd);
      handleClose();
      message.success("Successfully updated");
      setLoading(false);
    } catch (error: any) {
      message.error(error.message);
      setLoading(false);
    }
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadProps = useMemo(
    () => ({
      accept: ".png, .jpg, .jpeg, .xls, .csv, .pdf, .doc",
      beforeUpload: (file: any) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          setFileList((state) => [...state]);
          message.error(`Image must smaller than 2MB!`);
          return false;
        }
        setFileList((state) => [...state, file]);
        return false;
      },
      onRemove: (file: UploadFile) => {
        if (fileList.some((item) => item.uid === file.uid)) {
          setFileList((fileList) =>
            fileList.filter((item) => item.uid !== file.uid)
          );
          return true;
        }
        return false;
      },
    }),
    [fileList]
  );
  return (
    <Modal
      visible={modalVisible}
      title="Edit Document"
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        name="Edit Document"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onEditDocumentFinish}
        autoComplete="off"
      >
        <Form.Item label="File" name="EditFile">
          <Upload
         
            listType="picture"
            className="upload-list-inline"
            maxCount={1}
            // beforeUpload={() => false}
            {...uploadProps}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Please Select File</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="File Name"
          name="EditFileName"
          rules={[{ required: true, message: "Please enter file name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
          <Button
            style={{ margin: "10px" }}
            className={styles.buttonBlue}
            onClick={() => handleClose()}
          >
            Cancal
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditDocumentModal;
