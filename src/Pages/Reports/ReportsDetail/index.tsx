// import React from "react";

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Progress, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import ScreenShotSlider from "../Screenshotslider";
import styles from "./styles.module.less";

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
console.log(data2);
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
  // const columnses: ColumnsType<DataTypes> = [
  //   {
  //     title: "Time",
  //     dataIndex: "time",
  //   },
  //   {
  //     title: "Keyboard Press",
  //     dataIndex: "keyboard",
  //   },
  //   {
  //     title: "Mouse",
  //     dataIndex: "mouse",
  //   },
  // ];

  // const dataone: DataTypes[] = [
  //   {
  //     key: "1",
  //     time: "John Brown",
  //     keyboard: 32,
  //     mouse: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     time: "Jim Green",
  //     keyboard: 42,
  //     mouse: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     time: "Joe Black",
  //     keyboard: 32,
  //     mouse: "Sidney No. 1 Lake Park",
  //   },
  // ];
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
            <Link to="">EmployeeSummaries</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.reportSection}>
        <Row gutter={[16, 16]} align="middle">
          <Col xxl={4} xl={4} lg={6} md={8} xs={24}>
            <Button className={styles.btnDownload} type="primary">
              Download Csv File
            </Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(value: any) => ({
            onClick: () => {
              // navigate(``);
            },
          })}
        />

        <Col xl={9} lg={12} xs={24} style={{ marginLeft: "350px" }}>
          <h3>Activity Timeline</h3>
          <Doughnut data={data2} />
        </Col>
        <Row>
          <Col xl={15} lg={12} xs={24}>
            <h3>View Screenshot</h3>
            <span className={styles.reportDate}>
              Date: <strong>28 Jul 2022</strong>
            </span>
            <span className={styles.reportTime}>
              Time: <strong> 09:00 - 10:00</strong>
            </span>
          </Col>
        </Row>
        <ScreenShotSlider />
        {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {ScreenShotData.map((data: any) => {
            return (
              <Col span={4}>
                <div>
                  {list.map(() => (
                    <>
                      <Image
                        src={IMAGE_SRC}
                        preview={false}
                        onClick={() => setOpen(true)}
                      />
                      <Row gutter={[16, 16]}>
                        <Col>
                          <div>
                            <Progress
                              steps={10}
                              strokeColor={[green[6], green[6], red[5]]}
                              percent={data.porgress}
                            />
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <span className={styles.reportTimer}>
                              {data.time}
                            </span>
                          </div>
                        </Col>
                      </Row>{" "}
                    </>
                  ))}
                </div>
                <Modal
                  title="Screenshot Detail"
                  centered
                  open={open}
                  onOk={() => setOpen(false)}
                  onCancel={() => setOpen(false)}
                  width={1000}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1658808183982-f07bbbf67bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                    preview={false}
                    height={100}
                    width={950}
                  />
                  <Row>
                    <Col span={8}>
                      {" "}
                      <h1>11:30 am</h1>
                    </Col>
                    <Col span={8} offset={8}>
                      <h3>
                        {" "}
                        <DeleteOutlined style={{ marginLeft: "200px" }} />
                        Remove
                      </h3>
                    </Col>
                  </Row>
                  <h3>Active Window</h3>
                  <h4>index.tsx visual studio code</h4>
                  <h2>Memo</h2>-<h2>Activity</h2>
                  <h4>Activity Level</h4>
                  <Row>
                    <Col span={8}>Active 6 of 10 am</Col>
                    <Col span={8} offset={8}>
                      <Progress
                        percent={60}
                        steps={5}
                        strokeColor={[green[6], green[6], red[5]]}
                        style={{ marginLeft: "200px" }}
                      />
                    </Col>
                  </Row>
                  <h1 onClick={info}>
                    {" "}
                    <QuestionCircleOutlined /> what is activity level
                  </h1>
                  <Table
                    columns={columnses}
                    dataSource={dataone}
                    size="small"
                    pagination={false}
                  />
                </Modal>
              </Col>
            );
          })}
        </Row> */}
      </div>
    </div>
  );
};

export default Empreports;
