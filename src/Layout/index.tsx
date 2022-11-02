import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { Avatar, Dropdown, Layout, Menu, Divider, Button } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.less";
import Sidebar from "./Sidebar";

interface permissionData {
  permission: {
    _id?: string;
    dashBoard?: string;
    user?: string;
    role?: string;
    leave?: string;
  };
}

const Layouts: React.FC<permissionData> = ({ permission: permissionn }) => {
  const navigate = useNavigate();
  const { Header } = Layout;
  const checkUser = () => {
    Cookies.remove("authToken");
    Cookies.remove("userDetails");
    Cookies.remove("selectedKey");
    navigate("/");
  };
  const userNameCookie: any = Cookies.get("userDetails");
  const parsedUserDetail = JSON.parse(userNameCookie);
  const { name, email, roles, contactNumber } = parsedUserDetail;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const menu = (
    <Menu className={styles.menu}>
      <Avatar
        className={styles.avatar}
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
      >
        <span>{name.trim().charAt(0).toUpperCase()}</span>
      </Avatar>
      <h2>{parsedUserDetail ? name : "No user logedIn"}</h2>
      {roles.map((item: any) => {
        return <h3>{item.name}</h3>;
      })}
      <h6>{email}</h6>
      <h4>{contactNumber}</h4>
      <Divider></Divider>
      <div className={styles.buttonProfile}>
        <Button type="primary" className={styles.btnProfile}>
          <ProfileOutlined /> Profile
        </Button>
        <Link to="/login" onClick={checkUser}>
          <Button>
            <LogoutOutlined /> Logout
          </Button>
        </Link>
      </div>
    </Menu>
  );
  return (
    <div>
      <Layout>
        <Sidebar collapsed={collapsed} permission={permissionn} />
        <Layout>
          <div className={styles.container}>
            <Layout className={styles.main}>
              <Header className={styles.header}>
                <MenuOutlined onClick={toggle} style={{ fontSize: "20px" }} />
                <div className={styles.userIcon}>
                  <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <Avatar size={40} icon={<UserOutlined />} />
                  </Dropdown>
                </div>
              </Header>
              <div className={styles.breadcrumb}></div>
            </Layout>
          </div>
          <Outlet />
        </Layout>
      </Layout>
    </div>
  );
};
export default Layouts;
