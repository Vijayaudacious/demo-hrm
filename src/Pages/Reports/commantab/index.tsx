import { Breadcrumb } from "antd";
import {
  Card,
  DatePicker,
  Select,
  Input,
  Button,
  Row,
  Col,
  Table,
  Progress,
} from "antd";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";

import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./styles.module.less";
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
const tabList = [
  {
    key: "EmployeeSummary",
    tab: "Employee Summary",
  },
  {
    key: "Detailsummary",
    tab: "Detail Summary",
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
const Commontab = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>("EmployeeSummary");
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  const contentList: Record<string, React.ReactNode> = {
    EmployeeSummary: [
      <Row align="bottom">
        <Col lg={8} xs={24}>
          <Input
            style={{ display: "flex", margin: "auto" }}
            allowClear
            placeholder="Search here"
            autoFocus
            size="large"
            className={styles.searchBox}
          />
        </Col>
        <Col lg={8} xs={24}>
          <Button type="primary" size="large">
            Download
          </Button>
        </Col>
      </Row>,
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        onRow={(value: any) => ({
          onClick: () => {},
        })}
      />,
    ],
    Detailsummary: <p>content2</p>,
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
          <Breadcrumb.Item></Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">
              {"/reportdetail" ? "Reports / ReportDetail" : "report"}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Card
        style={{
          width: 1700,
          marginLeft: 10,
        }}
      >
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          size="large"
          style={{ marginRight: 10 }}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>

        {/* <RangePicker size="large" /> */}
      </Card>
      <Card
        style={{ width: "100%", marginTop: "20px", marginLeft: "10px" }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
    </div>
  );
};

export default Commontab;
