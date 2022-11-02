import {
  CalendarOutlined,
  HomeOutlined,
  IdcardOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu, Row } from "antd";
import "antd-css-utilities/utility.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import styles from "./styles.module.less";

const { Sider } = Layout;
interface headerInterface {
  collapsed: boolean;
  permission: {
    _id?: string;
    dashBoard?: string;
    user?: string;
    role?: string;
    leave?: string;
  };
}

const Sidebar: React.FC<headerInterface> = (props: headerInterface) => {
  const { dashBoard, user, role, leave } = props.permission;
  const [selectedKey, setSelectedKey] = useState(
    sessionStorage.getItem("selectedKey") || "1"
  );
  useEffect(() => {
    const activeList: any = sessionStorage.getItem("selectedKey");
    setSelectedKey(activeList);
  }, [selectedKey]);

  const onClickMenu = (item: any) => {
    setSelectedKey(item.key);
    sessionStorage.setItem("selectedKey", item.key);
  };
  return (
    <Row>
      <div className={styles.sidebar}>
        <Sider trigger={null} collapsible collapsed={props.collapsed}>
          <Menu
            defaultSelectedKeys={[selectedKey]}
            className={styles.menu}
            onClick={onClickMenu}
          >
            <Image preview={false} className={styles.logoImages} src={logo} />
            {dashBoard ? (
              <Menu.Item key="1">
                <Link className={styles.active} to="/ ">
                  <HomeOutlined /> <strong>Dashboard</strong>
                </Link>
              </Menu.Item>
            ) : null}
            {user ? (
              <Menu.Item key="2">
                <Link className={styles.active} to="/employee">
                  <UserOutlined /> <strong>Employees</strong>
                </Link>
              </Menu.Item>
            ) : null}
            {leave ? (
              <Menu.Item key="3">
                <Link className={styles.active} to="/calender">
                  <CalendarOutlined /> <strong>Leaves</strong>
                </Link>
              </Menu.Item>
            ) : null}

            {role ? (
              <Menu.Item key="4">
                <Link className={styles.active} to="/role">
                  <IdcardOutlined /> <strong>Role</strong>
                </Link>
              </Menu.Item>
            ) : null}
            <Menu.Item key="5">
              <Link className={styles.active} to="/report">
                <ProjectOutlined />
                <strong>Reports</strong>
              </Link>
            </Menu.Item>

            <Menu.Item key="6">
              <Link className={styles.active} to="/coming">
                <NotificationOutlined /> <strong>Notification</strong>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link className={styles.active} to="coming">
                <SettingOutlined /> <strong>Setting</strong>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    </Row>
  );
};
export default Sidebar;
