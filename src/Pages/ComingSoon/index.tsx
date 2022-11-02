import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./styles.module.less";

const ComingSoon = () => {
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
            <Link to="">Coming</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.mainDashboard}></div>
    </>
  );
};

export default ComingSoon;
