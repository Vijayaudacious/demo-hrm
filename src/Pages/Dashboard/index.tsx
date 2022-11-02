import {
  AccountBookOutlined,
  HomeOutlined,
  NotificationOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardTotalLeave } from "../../Services/Leaves";
import { DashboardTotalRole, DashboardTotalUser } from "../../Services/role";
import AdminCalender from "../AdminCalender";
import ListView from "../CalenderView/ListView";
import styles from "./styles.module.less";

interface permissionData {
  leavePermission?: string;
}
const Dashboard: React.FC<permissionData> = (
  leavePermission: permissionData
) => {
  const [allUser, setAllUser] = useState("");
  const [allRoles, setAllRoles] = useState("");
  const [allLeaves, setallLeaves] = useState("");
  const [showList, setShowList] = useState(true);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const roleData: any = await DashboardTotalRole();
      const userData: any = await DashboardTotalUser();
      const leaveData: any = await DashboardTotalLeave();
      setAllRoles(roleData.data.totalRole);
      setAllUser(userData.data.totalUser[0].status);
      setallLeaves(leaveData.data.totalLeaveRequest[0].status);
    } catch (error: any) {
      // message.error(error.message);
    }
  };

  const options = [
    { label: "Employee Details", value: true },
    { label: "List view", value: false },
  ];
  const onChangeToggle = (e: any) => {
    setShowList(e.target.value);
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
            <Link to="">Dashboard</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.mainDashboard}>
        <Row gutter={16}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className={styles.mbottom}
          >
            <div className={styles.cards}>
              <div className={styles.iconCyan}>
                <UserOutlined className={styles.cardIcon} />
              </div>
              <div className={styles.cardText}>
                <h2 className={styles.cardValue}>{allUser ? allUser : "0"}</h2>
                <h3 className={styles.cardName}>Total Users</h3>
              </div>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className={styles.mbottom}
          >
            <div className={styles.cards}>
              <div className={styles.iconBlue}>
                <TeamOutlined className={styles.cardIcon} />
              </div>
              <div className={styles.cardText}>
                <h2 className={styles.cardValue}>
                  {allRoles ? allRoles : "0"}
                </h2>
                <h3 className={styles.cardName}>Total Roles</h3>
              </div>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className={styles.mbottom}
          >
            <div className={styles.cards}>
              <div className={styles.iconGreen}>
                <AccountBookOutlined className={styles.cardIcon} />
              </div>
              <div className={styles.cardText}>
                <h2 className={styles.cardValue}>
                  {allLeaves ? allLeaves : "0"}
                </h2>
                <h3 className={styles.cardName}>Pending Leave Request</h3>
              </div>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className={styles.mbottom}
          >
            <div className={styles.cards}>
              <div className={styles.iconOrange}>
                <NotificationOutlined className={styles.cardIcon} />
              </div>
              <div className={styles.cardText}>
                <h2 className={styles.cardValue}>0</h2>
                <h3 className={styles.cardName}>Unread Notification</h3>
              </div>
            </div>
          </Col>
        </Row>

        <Row align="middle">
          <Col lg={24} xs={24}>
            <Radio.Group
              options={options}
              onChange={onChangeToggle}
              defaultValue={true}
              optionType="button"
              buttonStyle="solid"
            />
          </Col>
        </Row>
        {showList ? (
          <AdminCalender leavePermission={leavePermission.leavePermission} />
        ) : (
          <ListView leavePermission={leavePermission.leavePermission} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
