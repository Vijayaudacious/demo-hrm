import React from "react";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Progress,
  Row,
  Select,
  Table,
  Image,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.less";
import type { ColumnsType } from "antd/es/table";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { HomeOutlined } from "@ant-design/icons";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const data2 = {
  labels: ["Active Time", "Idle Time", "Stop Time"],
  datasets: [
    {
      label: "fkmvdf",
      data: [12, 19, 20],
      sizes: 5,
      backgroundColor: [
        " rgb(255, 0, 0) ",
        "rgb(124,252,0)",
        "rgb(211,211,211)",
      ],
      borderColor: ["rgba(34,139,34)", "rgb(124,252,0)", "rgb(211,211,211)"],
      borderWidth: 2,
    },
  ],
};
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
];
const Empreports = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const navigate = useNavigate();
  const style: React.CSSProperties = {
    padding: "8px 0",
    marginLeft: "8px",
    marginTop: "10px",
  };

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Breadcrumb className={styles.breadcrumbItem}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined style={{ fontSize: "20px" }} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">EmployeeSummary</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.reportSection}>
        <Row gutter={[16, 16]} align="middle">
          <Col xxl={10} xl={10} lg={9} md={8} xs={24}>
            {" "}
            <Select
              className={styles.selectInput}
              size="large"
              placeholder="Select Employee"
            ></Select>
          </Col>
          <Col xxl={10} xl={10} lg={9} md={8} xs={24}>
            <RangePicker size="large" />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={8} xs={24}>
            <Button className={styles.btnDownload} type="primary">
              Download Csv
            </Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(value: any) => ({
            onClick: () => {
              navigate(`/empreports`);
            },
          })}
        />
        <Row gutter={[16, 16]}>
          <Col xl={6} lg={12} xs={24}>
            <h3>Activity Timeline</h3>
            <Doughnut data={data2} />
          </Col>
          <Col xl={18} lg={12} xs={24}>
            <h3>View Screenshot</h3>
            <span className={styles.reportDate}>
              Date: <strong>28 Jul 2022</strong>
            </span>
            <span className={styles.reportTime}>
              {" "}
              Time: <strong> 09:00 - 10:00</strong>
            </span>
            <Row gutter={[16, 16]} className={styles.screenSection}>
              <Col xl={6} lg={12} md={12} xs={24}>
                <Image src="https://images.unsplash.com/photo-1658808183982-f07bbbf67bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
                <span className={styles.reportTimer}>09:00</span>
              </Col>
              <Col xl={6} lg={12} md={12} xs={24}>
                <Image src="https://images.unsplash.com/photo-1658341043172-5dff001f625a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
                <span className={styles.reportTimer}>09:00</span>
              </Col>
              <Col xl={6} lg={12} md={12} xs={24}>
                <Image src="https://images.unsplash.com/photo-1657561756804-c4a894e36ce9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
                <span className={styles.reportTimer}>09:00</span>
              </Col>
              <Col xl={6} lg={12} md={12} xs={24}>
                <Image src="https://images.unsplash.com/photo-1659035259836-0fe8c358a064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
                <span className={styles.reportTimer}>09:00</span>
              </Col>
              <Col xl={6} lg={12} md={12} xs={24}>
                <Image src="https://images.unsplash.com/photo-1659479709310-15f40b0eeb0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
                <span className={styles.reportTimer}>09:00</span>
              </Col>
              <Col xl={6} lg={12} md={12} xs={24}>
                <Image src="https://images.unsplash.com/photo-1659560893483-7e9312897c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
                <span className={styles.reportTimer}>09:00</span>
              </Col>
              <Button type="primary">See More</Button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Empreports;
