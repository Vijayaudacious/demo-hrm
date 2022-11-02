import { HomeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  message,
  Progress,
  Row,
  Select,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.less";
import queryString from "query-string";
import { Users } from "../../Services/Users";
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
interface filtersInterface {
  search: any;
  currentPage: any;
  limit: any;
  field: any;
  sortBy: any;
  fromDate: any;
  toDate: any;
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
  const [allList, setAllList] = useState([]);
  const { search: locationSearch } = useLocation();

  const navigate = useNavigate();
  const parsed = queryString.parse(locationSearch) || {};
  const {
    currentPage = 1,
    limit = 10,
    sortBy = 1,
    field = "none",
    search = "",
    fromDate = "",
    toDate = "",
  } = parsed;
  const [filters, setFilters] = useState<filtersInterface>({
    search,
    currentPage,
    limit,
    field,
    sortBy,
    fromDate,
    toDate,
  });
  const [dating, setDating] = useState(moment()) as any;
  const leftChange = () => {
    setDating(moment(dating).subtract(1, "days"));
  };
  const rightChange = () => {
    setDating(moment(dating).add(1, "day"));
  };
  const handleToday = () => {
    setDating(moment());
  };
  const handleChange = () => {
    setDating();
  };
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    try {
      const { data }: any = await Users(filters);
      setAllList(data.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const onInputChange = debounce(async (search: any) => {
    setFilters({ ...filters, search });
  }, 1000);
  const onInputSearch = debounce(async (value: string) => {
    setFilters({ ...filters, search: value, limit: "50" });
  }, 1000);
  return (
    <>
      <div
        className={styles.breadcrumb}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
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
        <div className={styles.addTime}>
          <Button type="primary" shape="round" size="large">
            Add Time
          </Button>
        </div>
      </div>
      <div className={styles.reportSection}>
        {/* <Row gutter={24}>
          <Col md={8}>
            <Select
              className={styles.selectInput}
              size="large"
              placeholder="Select Employee"
            ></Select>
          </Col>
          <Col md={5}>
            <Col>
            <LeftOutlined onClick={leftChange} />

            </Col>
           
<Col>
<DatePicker
              format="ddd, MMM Do YYYY"
              value={dating}
              onChange={handleChange}
            />
</Col>
         <Col>
         </Col>  
         <RightOutlined onClick={rightChange} />
<Col></Col>
            <h1 onClick={handleToday}>Today</h1>
          </Col>
          <Col md={4}>
            <Button type="primary">Download Csv</Button>
          </Col>
        </Row> */}
        <Row gutter={[16, 16]} align="middle">
          <Col xxl={10} xl={10} lg={9} md={6} xs={24}>
            <Select
              className={styles.selectInput}
              showSearch
              value= "Search here"
              optionFilterProp="children"
              size="large"
              allowClear
              placeholder="Select Employee"
              onSearch={onInputSearch}
              onChange={(e) => onInputChange(e.target.value)}
              defaultValue={filters.search}
            >
              {allList.map((item: any, record: any) => {
                return (
                  <Select.Option placeholder="search here" value={item._id}>
                    <div className="demo-option-label-item">{item.name}</div>
                  </Select.Option>
                );
              })}
            </Select>
          </Col>
          <Col xxl={10} xl={10} lg={9} md={6} xs={24}>
            <Row>
              <Col md={2}>
                <LeftOutlined onClick={leftChange} style={{ margin: "15px", color:"blue",fontSize:"15px"}} />
              </Col>
              <Col md={16}>
                <DatePicker
                  size="large"
                  format="ddd, MMM Do YYYY"
                  value={dating}
                  onChange={handleChange}
                />
              </Col>
              <Col md={2}>
                <RightOutlined
                  onClick={rightChange}
                  style={{ margin: "15px",color:"blue",fontSize:"15px" }}
                />
              </Col>
              <Col span={1}>
                <h1 onClick={handleToday} style={{ margin: "5px",color: "blue"}}>
                  Today
                </h1>
              </Col>
            </Row>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} xs={24}>
            <Button className={styles.btnDownload} type="primary">
              Download Csv
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col md={24}>
            <Table
              columns={columns}
              dataSource={data}
              onRow={(value: any) => ({
                onClick: () => {
                  navigate(`/reportDetail`);
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
