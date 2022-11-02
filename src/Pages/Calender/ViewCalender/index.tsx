import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Radio, Row } from "antd";
import queryString from "query-string";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminCalender from "../../AdminCalender";
import LeaveList from "../../CalenderView/LeaveList";
import styles from "./styles.module.less";
import type { RangePickerProps } from "antd/es/date-picker";

interface filtersInterface {
  search: any;
  currentPage: any;
  limit: any;
  field: any;
  sortBy: any;
  fromDate: any;
  toDate: any;
}
interface permissionData {
  leavePermission?: string;
  searched?: any;
  listDateProp?: any;
  PropToDate?: any;
}
const ViewCalender: React.FC<permissionData> = (
  leavePermission: permissionData,
  { searched, listDateProp, PropToDate }: permissionData
) => {

  const [listToggle, setListToggle] = useState(true);
  const onChangeToggle = (e: any) => {
    setListToggle(e.target.value);
  };

  const { search: locationSearch } = useLocation();
  const parsed = queryString.parse(locationSearch) || {};
  const {
    currentPage = 1,
    limit = 10,
    sortBy = 1,
    field = "",
    search = "",
  } = parsed;
  const [filters, setFilters] = useState<filtersInterface>({
    search,
    currentPage,
    limit,
    field,
    sortBy,
    fromDate: leavePermission.listDateProp,
    toDate: leavePermission.PropToDate,
  });

  useEffect(() => {
    setFilters({
      ...filters,
      search: leavePermission.searched,
      fromDate: leavePermission.listDateProp,
      toDate: leavePermission.PropToDate,
    });
    // eslint-disable-next-line
  }, [leavePermission]);

  const options = [
    { label: "Calender view", value: true },
    { label: "List view", value: false },
  ];
  const onDateChange = (
    value: RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {

    setFilters({
      ...filters,
      fromDate: dateString[0],
      toDate: dateString[1],
    });
  };

  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined style={{ fontSize: "20px" }} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/calender">Leave Calender</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/calender">
              {listToggle === true ? "Calender view" : "List view"}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {onDateChange}
      <div className={styles.mainSection}>
        <Row align="bottom">
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
        {listToggle ? (
          <div className={styles.mainInner}>
            <AdminCalender
              leavePermission={leavePermission.leavePermission}
              searched={filters.search}
              PropFromDate={filters.fromDate}
              PropToDate={filters.toDate}
            />
          </div>
        ) : (
          <LeaveList
            leavePermission={leavePermission.leavePermission}
            searched={filters.search}
            PropFromDate={filters.fromDate}
            PropToDate={filters.toDate}
          />
        )}
      </div>
    </>
  );
};
export default ViewCalender;
