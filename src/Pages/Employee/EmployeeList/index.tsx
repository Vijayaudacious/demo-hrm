import { EditOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  message,
  PageHeader,
  Row,
  Tag,
  DatePicker,
  Tooltip,
  Table,
} from "antd";
import dayjs from "dayjs";
import { debounce } from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DeleteUser, Users } from "../../../Services/Users";
import styles from "./styles.module.less";
import type { RangePickerProps } from "antd/es/date-picker";
import DeleteModal from "../../../Components/DeleteModal";
// import Table from "../../../Components/Table";

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
  userPermission?: string;
}
const EmployeeList: React.FC<permissionData> = (
  userPermission: permissionData
) => {
  const { search: locationSearch } = useLocation();
  const { RangePicker } = DatePicker;
  const parsed = queryString.parse(locationSearch) || {};
  const {
    currentPage = 1,
    limit = "",
    sortBy = 1,
    field = "none",
    search = "",
    fromDate = "",
    toDate = "",
  } = parsed;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [filters, setFilters] = useState<filtersInterface>({
    search,
    currentPage,
    limit,
    field,
    sortBy,
    fromDate,
    toDate,
  });
  useEffect(() => {
    let searched = queryString.stringify(filters);
    getData();
    navigate(`/employee/?${searched}`);
    // eslint-disable-next-line
  }, [filters]);

  const onInputChange = debounce(async (search: any) => {
    setFilters({ ...filters, search });
  }, 1000);
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setFilters({
      ...filters,
      field: sorter.field ? sorter.field : "none",
      sortBy: sorter.order,
      currentPage: pagination.totalRecords,
      limit: pagination.pageSize.totalRecords,
    });
  };
  const getData = async () => {
    setLoading(true);
    try {
      const { data }: any = await Users(filters);
      setTableData(data.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "S.No.",
      key: "index",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortDirections: ["1", "-1", "1"],
      render: (name: any) => {

        return (
          <>
        {name.length > 20 ? <>{name.slice(0, 35)}.....</> : name}
        </>
        )
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortDirections: ["1", "-1"],
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
    
      render: (roles: any) => (
       
        <>
          {roles.map(({ name }: any) => {
            // console.log(roles.slice(1),"roles")
            return (
              <div >
             {roles.length>5 ? 
             <>
             {(roles.length=5)}
             </>            :  <Tag key={name} color="blue" style={{  width: "120px",whiteSpace:"normal"}}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Tag>}
              </div>
            );
          })}
        </>
      ),
    },
    {
      title: "Leaves",
      dataIndex: "allocatedLeaves",
      key: "allocatedLeaves",
      width: ".2%",
    },
    {
      title: "Last Login At",
      dataIndex: "lastLoginAt",
      key: "lastLoginAt",
      render: (lastLoginAt: any) => {
        return (
          <>
            {dayjs(lastLoginAt).format("DD-MMM-YYYY hh:mm A")
              ? lastLoginAt
              : "-"}
          </>
        );
      },
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      render: (joiningDates: any) => {
        return <>{dayjs(joiningDates).format("DD-MMM-YYYY hh:mm A")}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => {
        return (
          <>
            {userPermission.userPermission === "admin" ||
            userPermission.userPermission === "write" ? (
              <>
                <Tooltip title={record.isPredefined ? "Can't Edit" : "Edit"}>
                  <EditOutlined
                    className={styles.editBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(record);
                    }}
                  />
                </Tooltip>
                {userPermission.userPermission === "admin" ? (
                  <Tooltip title="Delete">
                    <DeleteModal
                      title="Do you want to remove this employee?"
                      handleOk={() => handleDelete(record)}
                    />
                  </Tooltip>
                ) : null}
              </>
            ) : (
              "No Action"
            )}
          </>
        );
      },
    },
  ];
  const handleDelete = async (record: any) => {
    try {
      const { data }: any = await DeleteUser(record._id);
      message.success(data.message);
      getData();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleEdit = (value: any) => {
    navigate(`/editemployee/${value._id}`);
  };
  const onClick = () => {
    navigate("/addemployee");
  };

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
        <Breadcrumb className={styles.breadcrumbItem}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined style={{ fontSize: "20px" }} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">Employees</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row>
        <Col flex="auto" className={styles.EmployeeSection}>
          <PageHeader
            ghost={false}
            title="Employee List"
            extra={[
              <>
                {userPermission.userPermission === "write" ||
                userPermission.userPermission === "admin" ? (
                  <Button
                    key="1"
                    onClick={onClick}
                    type="primary"
                    className={styles.add_employee}
                  >
                    <PlusOutlined />
                    Add
                  </Button>
                ) : null}
              </>,
            ]}
          ></PageHeader>
          <Row gutter={20}>
            <Col lg={12} xs={24}>
              <h4 style={{ marginLeft: "20px" }}>Search Here</h4>
              <Input
                allowClear
                placeholder="Search here"
                autoFocus
                className={styles.searchBox}
                onChange={(e) => onInputChange(e.target.value)}
                defaultValue={filters.search}
              />
            </Col>
            <Col lg={12} xs={24}>
              <h4 style={{ marginLeft: "20px" }}>Joining Date</h4>
              <RangePicker
                format="YYYY-MM-DD"
                onChange={onDateChange}
                className={styles.searchBox}
                showTime
              />
            </Col>
          </Row>
          <Table
          style={{ width: 'auto' }}
            className={styles.employeTable}
            dataSource={tableData}
            loading={loading}
            pagination={{
              showSizeChanger: true,
            }}
            // scroll={{ x: 'max-content' }}
            columns={columns as any}
            onRow={(value: any) => ({
              onClick: () => {
                navigate(`/details/${value._id}`);
              },
            })}
            onChange={handleTableChange}
          />
          {/* <Table
            columns={columns}
            loading={loading}
            dataSource={tableData}
            
            handleChange={handleTableChange}
          /> */}
        </Col>
      </Row>
    </>
  );
};
export default EmployeeList;
