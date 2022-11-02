import { Button, Col, Form, Image, Input, message, Row } from "antd";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Login } from "../../Services/auth";
import styles from "./styles.module.less";
import logo from "../../Assets/Images/logo.png";
import logoBlue from "../../Assets/Images/logoBlue.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: loginMutation, isLoading } = useMutation(Login);
  const [form] = Form.useForm();
  const checkCookie = Cookies.get("authToken");
  useEffect(() => {
    if (checkCookie) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const onFinish = async (values: any) => {
    try {
      const { data }: any = await loginMutation({
        email: values.email,
        password: values.password,
      });

      message.success(data.message);
      Cookies.set("authToken", data.token);
      Cookies.set("userName", JSON.stringify(data.details.name));
      Cookies.set("userDetails", JSON.stringify(data.details));
      Cookies.set("userRole", JSON.stringify(data.details.roles));
      sessionStorage.setItem("selectedKey", "1");
      navigate("/");
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };
  return (
    <section className={styles.mainSection}>
      <Row gutter={16} className={styles.rowSection}>
        <Col xs={24} sm={24} md={12} className={styles.centerSection}>
          <Image className={styles.logoImg} src={logo} />
          <h2 className={styles.leftHeading}>
            <span>Welcome Back</span>
            <p>
              Human Resource Management provides knowledge to empower HR by
              letting you engage with your workforce in a strategic way.
            </p>
          </h2>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <div className={styles.container}>
            <div className={styles.loginForm}>
              <Image className={styles.logoImages} src={logoBlue} />
              <h1 className={styles.loginHeading}>Login</h1>
              <Form
                form={form}
                name="horizontal_login"
                onFinish={onFinish}
                className={styles.formLogines}
              >
                <Form.Item
                  className={styles.forminner}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please enter your valid email",
                    },
                    {
                      required: true,
                      message: "Email is  required",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    className={styles.loginInput}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter your password"
                    className={styles.loginInput}
                  />
                </Form.Item>

                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      className={styles.buttonBlue}
                    >
                      Login
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};
export default LoginPage;
