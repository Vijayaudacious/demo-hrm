import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Row,
  Select,
  Progress,
  Table,
} from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.less";
import type { ColumnsType } from "antd/es/table";

import { HomeOutlined } from "@ant-design/icons";
import { Doughnut } from "react-chartjs-2";

interface DataType {
  key: string;
  employeename: string;
  activityduration: number;
  activitypercentage: number;
  idlepercentage: number;
  activetime: number;
  idletime: number;
  totaltime: number;
  stoptime: number;
}
const data: DataType[] = [
  {
    key: "1",
    employeename: "John Brown",
    activityduration: 32,
    activitypercentage: 12,
    idlepercentage: 100,
    activetime: 36,
    idletime: 36,
    totaltime: 36,
    stoptime: 12,
  },
  {
    key: "2",
    employeename: "Johny Brown",
    activityduration: 32,
    activitypercentage: 12,
    idlepercentage: 100,
    activetime: 36,
    idletime: 36,
    totaltime: 36,
    stoptime: 12,
  },
];
const columns: ColumnsType<DataType> = [
  {
    title: "Employee Name",
    dataIndex: "employeename",
    key: "employeename",
  },
  {
    title: "Activity Duration",
    dataIndex: "activityduration",
    key: "activityduration",
  },
  {
    title: "Activity Percentage",
    dataIndex: "activitypercentage",
    key: "activitypercentage",
    render: (text) => (
      <Progress type="circle" percent={75} strokeColor="limegreen" />
    ),
  },
  {
    title: "Idle Percentage",
    dataIndex: "idlepercentage",
    key: "idlepercentage",
    render: (text) => (
      <Progress type="circle" percent={80} strokeColor="redd" />
    ),
  },
  {
    title: "Active Time",
    dataIndex: "activetime",
    key: "activetime",
  },
  {
    title: "Idle Time",
    dataIndex: "idletime",
    key: "idletime",
  },
  {
    title: "Total Time",
    dataIndex: "totaltime",
    key: "total time",
  },
  {
    title: "Stop Time",
    dataIndex: "stoptime",
    key: "stoptime",
  },
];
const Reporting = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const navigate = useNavigate();

  const style: React.CSSProperties = {
    padding: "8px 0",
    marginLeft: "8px",
    marginTop: "10px",
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
            <Link to="">Reports</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.reportSection}>
        <Row gutter={16}>
          <Col md={8}>
            <Select
              className={styles.selectInput}
              size="large"
              placeholder="Select Employee"
            ></Select>
          </Col>
          <Col md={8}>
            <RangePicker size="large" />
          </Col>
          <Col md={8}>
            <Button type="primary">Download Csv</Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col md={24}>
            <Table
              columns={columns}
              dataSource={data}
              onRow={(value: any) => ({
                onClick: () => {
                  navigate(`/empreports`);
                },
              })}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Reporting;
