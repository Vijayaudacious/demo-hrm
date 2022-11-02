import {
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  PageHeader,
  Row,
  Select,
  Tooltip,
  Upload,
} from "antd";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AllRoles } from "../../../Services/role";
import {
  AddUser,
  DeleteDocument,
  EditUser,
  UserDetail,
} from "../../../Services/Users";
import EditDocumentModal from "./EditDocumentModal";
import styles from "./styles.module.less";

interface permissionData {
  rolePermission?: string;
}
const AddEmployee: React.FC<permissionData> = (
  rolePermission: permissionData
) => {
  const [form] = Form.useForm();
  let { id }: any = useParams();
  const baseURL = process.env.REACT_APP_FILE_BASE_URL;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUploadedDocument, setshowUploadedDocument] = useState<any>([]);
  const [editingFileData, setEditingFileData] = useState({
    docId: "",
    docName: "",
  });
  const [allRoles, setAllRoles] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    limit: "",
  });
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [handleNextDoc, setHandleNextDoc] = useState<any>(false);
  const [handleNextDocType, setHandleNextDocType] = useState<any>(false);
  const docAuth = handleNextDocType && handleNextDoc;
  useEffect(() => {
    if (
      rolePermission.rolePermission === "admin" ||
      rolePermission.rolePermission === "write"
    ) {
      getAllRoles();
    }
    if (id) {
      editUser(id);
    }
    // eslint-disable-next-line
  }, [filters]);

  const getAllRoles = async () => {
    try {
      const { data }: any = await AllRoles(filters);
      setAllRoles(data.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const editUser = async (id: string) => {
    const { data }: any = await UserDetail(id);

    setshowUploadedDocument(data?.data.document);
    const {
      name,
      email,
      contactNumber,
      allocatedLeaves,
      roles: objRoles,
      document: documents,
    } = data.data;
    let roles = objRoles.map(({ _id, name }: any) =>
      rolePermission.rolePermission === "admin" ||
      rolePermission.rolePermission === "write"
        ? _id
        : name
    );
    if (data.data) {
      form.setFieldsValue({
        name,
        email,
        contactNumber,
        allocatedLeaves,
        roles,
        documents: documents.map((item: any) => {
          return {
            ...item,
            first: item.name,
            Upload: item.file,
          };
        }),
      });
      form.setFieldsValue(documents[0].first);
      for (const key in { documents }) {
        if (Object.prototype.hasOwnProperty.call({ documents }, key)) {
          form.setFieldsValue({ documents }[key].first);
        }
      }
    }
  };

  let resultedFileArr = showUploadedDocument.map(({ file }: any) => file);

  const arr: any[] = [];
  for (let i = 0; i < resultedFileArr.length; i++) {
    const obj: any = {};
    obj["uid"] = Math.random();
    obj["name"] = `Doc ${i + 1}`;
    obj["url"] = `${baseURL}${resultedFileArr[i]}`;
    arr.push(obj);
  }

  const navigate = useNavigate();
  const { Option } = Select;

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24,
      },
    },
  };
  const onFinish = async (values: any) => {
    const { name, email, contactNumber, allocatedLeaves, roles } = values;
    const fd: any = new FormData();
    for (const key in {
      name,
      email,
      contactNumber,
    }) {
      if (
        Object.prototype.hasOwnProperty.call(
          {
            name,
            email,
            contactNumber,
          },
          key
        )
      ) {
        fd.append(
          key,
          {
            name,
            email,
            contactNumber,
          }[key]
        );
      }
    }
    fd.append(
      "allocatedLeaves",
      allocatedLeaves === null ? 12 : allocatedLeaves
    );
    if (
      rolePermission.rolePermission === "admin" ||
      rolePermission.rolePermission === "write"
    ) {
      fd.append("roles", roles ? JSON.stringify(roles) : []);
    }

    const documentNameArr = [];
    if (!id) {
      for (const key in values.documents) {
        if (Object.prototype.hasOwnProperty.call(values.documents, key)) {
          documentNameArr.push(values.documents[key].first);
        }
      }
    } else {
      for (const key in values.documents) {
        if (Object.prototype.hasOwnProperty.call(values.documents, key)) {
          if (values.documents[key].Upload.file !== undefined) {
            documentNameArr.push(values.documents[key].first);
          }
        }
      }
    }
    if (documentNameArr.length) {
      fd.append("documentName", JSON.stringify(documentNameArr));
    }
    if (!id) {
      for (const key in values.documents) {
        if (Object.prototype.hasOwnProperty.call(values.documents, key)) {
          fd.append("document", values.documents[key].Upload.file);
        }
      }
    } else {
      for (const key in values.documents) {
        if (Object.prototype.hasOwnProperty.call(values.documents, key)) {
          if (values.documents[key].Upload.file !== undefined) {
            fd.append("document", values.documents[key].Upload.file);
          }
        }
      }
    }

    if (!id) {
      setLoading(true);
      try {
        const { data }: any = await AddUser(fd);
        setLoading(false);
        message.success(data.message);
        navigate("/employee");
      } catch (error: any) {
        setLoading(false);
        message.error(error.response.data.message);
      }
    } else {
      setLoading(true);
      try {
        const { data }: any = await EditUser(id, fd);
        setLoading(false);
        message.success(data.message);
        navigate("/employee");
      } catch (error: any) {
        setLoading(false);
        message.error(error.message);
      }
    }
  };

  const onInputSearch = debounce(async (value: string) => {
    console.log("value", value);
    
    setFilters({ ...filters, search: value, limit: "50" });
  }, 1000);

  const deleteDocument = async (name: any) => {
    Modal.confirm({
      title: `Do you want to delete this document?`,
      centered: true,
      icon: <DeleteOutlined style={{ color: "red" }} />,
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const { data }: any = await DeleteDocument(id, {
            docId: showUploadedDocument[name]?._id,
          });
          editUser(id);
          message.success(data.message);
        } catch (error: any) {
          message.error(error.message);
        }
      },
    });
  };

  const showModal = (name: any) => {
    setEditingFileData({
      ...editingFileData,
      docId: showUploadedDocument[name]._id,
      docName: showUploadedDocument[name].name,
    });
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(!modalVisible);
    setIsHide(false);
    editUser(id);
  };

  const blockInvalidChar = (e: any) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  const [isHide, setIsHide] = useState(false);
  const uploadProps = useMemo(
    () => ({
      accept: ".png, .jpg, .jpeg, .xls, .csv, .pdf, .doc",
      beforeUpload: (file: any) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          setHandleNextDoc(false);
          message.error(`Image must smaller than 2MB!`, 10);
          setIsHide(true);
          return false;
        }

        setIsHide(false);
        setHandleNextDoc(true);

        return false;
      },
      // onRemove: (file: UploadFile) => {

      //   return false;
      // },
    }),
    []
  );

  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumb className={styles.breadcrumbItem}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined style={{ fontSize: "20px" }} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/employee">Employees</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">{id ? "Edit Employee" : "New Employee"}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Col flex="auto" className={styles.addemployeeSection}>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={id ? "Edit Employee" : "New Employee"}
        ></PageHeader>
        <div className={styles.innerSection}>
          <div className={styles.sectionInner}>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              className={styles.loginForm}
              layout="vertical"
              initialValues={{ allocatedLeaves: 12 }}
              scrollToFirstError
            >
              <Row gutter={16}>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter name"
                      className={styles.loginInput}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Invalid email address",
                      },
                      {
                        required: true,
                        message: "Please enter email address",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter email address"
                      className={styles.loginInput}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Contact Number"
                    name="contactNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter contact number",
                      },
                      {
                        min: 10,
                        message: "Please enter valid contact number",
                      },
                      {
                        max: 10,
                        message: "Enter valid mobile number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter contact number"
                      className={styles.loginInput}
                      type="number"
                      value={PhoneNumber}
                      onKeyDown={blockInvalidChar}
                      onInput={(e: any) =>
                        (e.target.value = e.target.value.slice(0, 12))
                      }
                      onChange={(event: any) => {
                        if (event.target.value.length === 11) return false;
                        setPhoneNumber(event.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item>
                    <Form.Item label="Leaves" name="allocatedLeaves">
                      <InputNumber
                        min={0}
                        max={300}
                        placeholder="Leaves"
                        className={styles.loginInput}
                      />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col lg={24} xs={24}>
                  <Form.Item
                    label="Roles"
                    name="roles"
                    rules={[
                      {
                        type: "array",
                      },
                    ]}
                  >
                    <Select
                    allowClear
                      className={styles.selectInput}
                      maxTagCount={5}
                      value
                      style={{ width: "100%" }}
                      mode="multiple"
                      disabled={
                        rolePermission.rolePermission === "admin" ||
                        rolePermission.rolePermission === "write"
                          ? false
                          : true
                      }
                      placeholder="Select your role"
                      onSearch={onInputSearch}
                    >
                      {allRoles.map((item: any) => {
                        return (
                          <Option value={item._id}>
                            <div className="demo-option-label-item">
                              {item.name}
                            </div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={24} xs={24}>
                  <Form.Item label="Upload Document" valuePropName="fileList">
                    <Form.List name="documents">
                      {(fields, { add, remove }) => {
                        return (
                          <>
                            <div className="site-card-wrapper">
                              <Row gutter={16}>
                                {fields.map(
                                  ({ key, name, ...restField }, index) => {
                                    return (
                                      <Col span={8}>
                                        <Card
                                          title={`Document no.${index + 1}`}
                                          hoverable
                                        >
                                          <Form.Item
                                            {...restField}
                                            name={[name, "first"]}
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter document name",
                                              },
                                            ]}
                                          >
                                            <Input
                                              placeholder="Type of document"
                                              disabled={arr[key] ? true : false}
                                              onChange={(e) =>
                                                setHandleNextDocType(true)
                                              }
                                            />
                                          </Form.Item>
                                          <Row>
                                            <Col span={16}>
                                              <Form.Item
                                                {...restField}
                                                name={[name, "Upload"]}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please upload document",
                                                  },
                                                ]}
                                              >
                                                <Upload
                                                  name="logo"
                                                  listType="picture"
                                                  className="upload-list-inline"
                                                  maxCount={1}
                                                  {...uploadProps}
                                                  fileList={
                                                    arr[key]
                                                      ? [arr[key]]
                                                      : undefined
                                                  }
                                                >
                                                  {arr[key] ? null : (
                                                    <Button
                                                      icon={<UploadOutlined />}
                                                    >
                                                      Upload
                                                    </Button>
                                                  )}
                                                </Upload>
                                              </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                              {arr[key] && (
                                                <Tooltip title="Edit">
                                                  <Button
                                                    icon={<EditOutlined />}
                                                    onClick={() =>
                                                      showModal(name)
                                                    }
                                                  />
                                                </Tooltip>
                                              )}
                                            </Col>
                                            <Col span={4}>
                                              <Tooltip title="Delete">
                                                <Button
                                                  icon={<DeleteOutlined />}
                                                  danger
                                                  onClick={() => {
                                                    setHandleNextDocType(true);
                                                    setHandleNextDoc(true);
                                                    setIsHide(false);
                                                    if (id && arr[key]) {
                                                      deleteDocument(name);
                                                    } else {
                                                      remove(name);
                                                    }
                                                  }}
                                                />
                                              </Tooltip>
                                            </Col>
                                          </Row>
                                        </Card>
                                      </Col>
                                    );
                                  }
                                )}
                              </Row>
                            </div>
                            <Form.Item>
                              {fields.length <= 2 && (
                                <Button
                                  className={styles.buttonBlue}
                                  onClick={() => {
                                    setHandleNextDocType(false);
                                    setHandleNextDoc(false);
                                    add();
                                  }}
                                  block
                                  icon={<PlusOutlined />}
                                  disabled={
                                    fields.length === 0
                                      ? false
                                      : arr.length
                                      ? false
                                      : !docAuth
                                  }
                                >
                                  Add Document
                                </Button>
                              )}
                            </Form.Item>
                          </>
                        );
                      }}
                    </Form.List>
                  </Form.Item>
                </Col>
                <Col lg={24} xs={24}>
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={`${styles.buttonBlue} ${styles.buttonAdd}`}
                      loading={loading}
                      disabled={isHide}
                    >
                      {id ? "Update" : "Add"}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Col>
      <EditDocumentModal
        modalVisible={modalVisible}
        handleClose={handleClose}
        editingFileData={editingFileData}
      />
    </>
  );
};
export default AddEmployee;
