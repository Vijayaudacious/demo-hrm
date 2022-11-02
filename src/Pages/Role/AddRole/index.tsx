import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  PageHeader,
  Row,
} from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addRole, EditRole, roleDetail } from "../../../Services/role";
import styles from "./styles.module.less";

const AddRole = () => {
  // const { TextArea } = Input;
  const { mutateAsync: addRoleMutation } = useMutation(addRole);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { id }: any = useParams();
  const [dashboardValue, setDashboardValue] = useState<
    string | undefined | number | true
  >();
  const [roleValue, setRoleValue] = useState<
    string | undefined | number | true
  >();
  const [userValue, setUserValue] = useState<
    string | undefined | number | true
  >();
  const [leaveValue, setLeaveValue] = useState<
    string | undefined | number | true
  >();
  useEffect(() => {
    if (id) {
      editRole(id);
    }
    // eslint-disable-next-line
  }, []);

  const [form] = Form.useForm();

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
    },
  };

  const editRole = async (id: string) => {
    const { data }: any = await roleDetail(id);
    const { name, description } = data.data;
    const { dashBoard, user, role, leave } = data.data.permission;
    setDashboardValue(dashBoard);
    if (dashBoard === "admin") {
      form.setFieldsValue({
        dashBoard: ["read", "write", "admin"],
      });
    } else if (dashBoard === "write") {
      form.setFieldsValue({
        dashBoard: ["read", "write"],
      });
    } else if (dashBoard === "read") {
      form.setFieldsValue({
        dashBoard: ["read"],
      });
    }
    setUserValue(user);
    if (user === "admin") {
      form.setFieldsValue({
        user: ["read", "write", "admin"],
      });
    } else if (user === "write") {
      form.setFieldsValue({
        user: ["read", "write"],
      });
    } else if (user === "read") {
      form.setFieldsValue({
        user: ["read"],
      });
    }
    setRoleValue(role);
    if (role === "admin") {
      form.setFieldsValue({
        role: ["read", "write", "admin"],
      });
    } else if (role === "write") {
      form.setFieldsValue({
        role: ["read", "write"],
      });
    } else if (role === "read") {
      form.setFieldsValue({
        role: ["read"],
      });
    }
    setLeaveValue(leave);
    if (leave === "admin") {
      form.setFieldsValue({
        leave: ["read", "write", "admin"],
      });
    } else if (leave === "write") {
      form.setFieldsValue({
        leave: ["read", "write"],
      });
    } else if (leave === "read") {
      form.setFieldsValue({
        leave: ["read"],
      });
    }
    if (data.data) {
      form.setFieldsValue({ name, description });
    }
  };
  const onFinish = async (values: any) => {
    const { name, description } = values;
    let permission: any = {
      dashBoard: dashboardValue,
      leave: leaveValue,
      user: userValue,
      role: roleValue,
    };
    if (!id) {
      setLoading(true);
      try {
        const { data }: any = await addRoleMutation({
          name,
          description,
          permission,
        });
        setLoading(false);
        message.success(data.message);
        navigate("/role");
      } catch (error: any) {
        setLoading(false);
        message.error(
          error.response.data.message === "Atlest one field is required "
            ? error.response.data.message
            : error.response.data.errors[0].name
        );
      }
    } else {
      setLoading(true);
      try {
        const { data }: any = await EditRole(id, {
          name,
          description,
          permission,
        });
        setLoading(false);
        message.success(data.message);
        navigate("/role");
      } catch (error: any) {
        message.error(
          error.response.data.message === "Atlest one field is required "
            ? error.response.data.message
            : error.response.data.errors[0].name
        );
        setLoading(false);
        navigate("/role");
      }
    }
  };

  const plainOptions = [
    {
      label: "read",
      value: "read",
    },
    {
      label: "write",
      value: "write",
    },
    {
      label: "delete",
      value: "admin",
    },
  ];
  const onDashboardChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find((element) => element === "admin")) {
      setDashboardValue("admin");
      form.setFieldsValue({
        dashBoard: ["read", "write", "admin"],
      });
    } else if (checkedValues.find((element) => element === "write")) {
      setDashboardValue("write");
      form.setFieldsValue({
        dashBoard: ["read", "write"],
      });
    } else if (checkedValues.find((element) => element === "read")) {
      setDashboardValue("read");
    } else {
      setDashboardValue(undefined);
    }
  };
  const onRoleChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find((element) => element === "admin")) {
      setRoleValue("admin");
      form.setFieldsValue({
        role: ["read", "write", "admin"],
      });
    } else if (checkedValues.find((element) => element === "write")) {
      setRoleValue("write");
      form.setFieldsValue({
        role: ["read", "write"],
      });
    } else if (checkedValues.find((element) => element === "read")) {
      setRoleValue("read");
    } else {
      setRoleValue(undefined);
    }
  };
  const onUserChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find((element) => element === "admin")) {
      setUserValue("admin");
      form.setFieldsValue({
        user: ["read", "write", "admin"],
      });
    } else if (checkedValues.find((element) => element === "write")) {
      setUserValue("write");
      form.setFieldsValue({
        user: ["read", "write"],
      });
    } else if (checkedValues.find((element) => element === "read")) {
      setUserValue("read");
    } else {
      setUserValue(undefined);
    }
  };
  const onLeaveChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find((element) => element === "admin")) {
      setLeaveValue("admin");
      form.setFieldsValue({
        leave: ["read", "write", "admin"],
      });
    } else if (checkedValues.find((element) => element === "write")) {
      setLeaveValue("write");
      form.setFieldsValue({
        leave: ["read", "write"],
      });
    } else if (checkedValues.find((element) => element === "read")) {
      setLeaveValue("read");
    } else {
      setLeaveValue(undefined);
    }
  };

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
            <Link to="/role">Roles</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">{id ? "Edit Role" : "New Role"}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Col flex="auto" className={styles.mainSection}>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={id ? "Edit Role" : "New Role"}
        ></PageHeader>
        <div className={styles.mainSection}>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            className={styles.loginForm}
            scrollToFirstError
          >
            <Form.Item
              label="Role Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the role name",
                },
              ]}
            >
              <Input
              style={{textTransform: "capitalize"}}

                placeholder="Enter role name"
                className={styles.loginInput}
                maxLength={25}
              />
            </Form.Item>
            <Form.Item
              label="Description (max 200 characters)"
              name="description"
            >
              <Input
                placeholder=" Enter description"
                className={styles.loginInput}
                maxLength={200}
              />
            </Form.Item>
            <Form.Item 
            name="permissions"
            label="Permissions"
            rules={[
              {
                required: true,
                message: "Please Select Permission",
              },
            ]}
            >
              <Row gutter={16}>
                <Col lg={24} md={24} sm={24} xs={24}>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                  <Form.Item name="dashBoard">
                    <h3>Dashboard</h3>
                    <Checkbox.Group
                      onChange={onDashboardChange}
                      options={plainOptions}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                  <Form.Item name="role">
                    <h3>Role</h3>
                    <Checkbox.Group
                      options={plainOptions}
                      onChange={onRoleChange}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                  <Form.Item name="user">
                    <h3>User</h3>
                    <Checkbox.Group
                      options={plainOptions}
                      onChange={onUserChange}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                  <Form.Item name="leave">
                    <h3>LeaveRequest</h3>
                    <Checkbox.Group
                      options={plainOptions}
                      onChange={onLeaveChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.buttonBlue}
                loading={loading}
              >
                {id ? "Edit" : "Add"}
              </Button>
              <Button
                type="default"
                htmlType="reset"
                className={styles.buttonBlue}
                onClick={() => navigate("/role")}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </>
  );
};
export default AddRole;
