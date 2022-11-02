import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  message,
  PageHeader,
  Row,
  Table,
  Tooltip,
} from "antd";
import { debounce } from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "../../../Components/DeleteModal";
import { DeleteRole, Roles } from "../../../Services/role";
import styles from "./styles.module.less";

interface filtersInterface {
  search: any;
  currentPage: any;
  limit: any;
  field: any;
  sortBy: any;
}
interface permissionData {
  rolePermission?: string;
}
const RoleList: React.FC<permissionData> = (rolePermission: permissionData) => {
  const { search: locationSearch } = useLocation();
  const parsed = queryString.parse(locationSearch) || {};
  const {
    currentPage = 1,
    limit = "",
    sortBy = 1,
    field = "none",
    search = "",
  } = parsed;
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState<filtersInterface>({
    search,
    currentPage,
    limit,
    field,
    sortBy,
  });

  const navigate = useNavigate();
  useEffect(() => {
    let searched = queryString.stringify(filters);
    getData();
    navigate(`/role/?${searched}`);
    // eslint-disable-next-line
  }, [filters]);
  const getData = async () => {
    setLoading(true);
    try {
      const { data }: any = await Roles(filters);
      setTableData(data.data);
      setLoading(false);
    } catch (error: any) {
      message.error(error.message);
      setLoading(false);
    }
  };

  const onInputChange = debounce(async (search: any) => {
    setFilters({ ...filters, search });
  }, 1000);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setFilters({
      ...filters,
      field: sorter?.field || "none",
      sortBy: sorter?.order || 1,
      currentPage: pagination.current?.totalRecords,
      limit: pagination.pageSize.totalRecords,
    });
  };
  const columns = [
    {
      title: "S.No.",
      key: "index",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Role",
      dataIndex: "name",
      key: "name",
      width: "10%",
      sorter: true,
      sortDirections: ["1", "-1", "1"],
      render: (name : any) =>{
        return(
          <>
        {name.charAt(0).toUpperCase() + name.slice(1)}
        </>
)
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
      sorter: true,
      sortDirections: ["1", "-1"],
      render: (description: any) => <>{description ? description : "-"}</>,
    },
    {
      title: "Permissions",
      children: [
        {
          title: "Dashboard",
          children: [
            {
              title: "Read",
              dataIndex: "permission",
              key: "dashBoardRead",
              render: ({ dashBoard }: any) => {
                let permissionType;
                switch (dashBoard) {
                  case "read":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Write",
              dataIndex: "permission",
              key: "dashBoardWrite",
              render: ({ dashBoard }: any) => {
                let permissionType;
                switch (dashBoard) {
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Delete",
              dataIndex: "permission",
              key: "dashBoardDelete",
              render: ({ dashBoard }: any) => {
                let permissionType;
                switch (dashBoard) {
                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
          ],
        },
        {
          title: "Role",
          children: [
            {
              title: "Read",
              dataIndex: "permission",
              key: "userRead",
              render: ({ role }: any) => {
                let permissionType;
                switch (role) {
                  case "read":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Write",
              dataIndex: "permission",
              key: "userWrite",
              render: ({ role }: any) => {
                let permissionType;
                switch (role) {
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Delete",
              dataIndex: "permission",
              key: "userDelete",
              render: ({ role }: any) => {
                let permissionType;
                switch (role) {
                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
          ],
        },
        {
          title: "User",
          children: [
            {
              title: "Read",
              dataIndex: "permission",
              key: "userRead",
              render: ({ user }: any) => {
                let permissionType;
                switch (user) {
                  case "read":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Write",
              dataIndex: "permission",
              key: "userWrite",
              render: ({ user }: any) => {
                let permissionType;
                switch (user) {
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Delete",
              dataIndex: "permission",
              key: "userWrite",
              render: ({ user }: any) => {
                let permissionType;
                switch (user) {
                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
          ],
        },
        {
          title: "Leaves",
          children: [
            {
              title: "Read",
              dataIndex: "permission",
              key: "userRead",
              render: ({ leave }: any) => {
                let permissionType;
                switch (leave) {
                  case "read":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Write",
              dataIndex: "permission",
              key: "userWrite",
              render: ({ leave }: any) => {
                let permissionType;
                switch (leave) {
                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;
                  case "write":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission} />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
            {
              title: "Delete",
              dataIndex: "permission",
              key: "userWrite",
              render: ({ leave }: any) => {
                let permissionType;
                switch (leave) {
                  case "admin":
                    permissionType = (
                      <CheckOutlined className={styles.permission} />
                    );
                    break;

                  default:
                    permissionType = (
                      <CloseOutlined className={styles.noPermission}   />
                    );
                    break;
                }
                return <p>{permissionType}</p>;
              },
            },
          ],
        },
      ],
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => {
        return (
          <>
            <Row>
              {rolePermission.rolePermission === "admin" ||
              rolePermission.rolePermission === "write" ? (
                <>
                  <Tooltip title={record.isPredefined ? "Can't Edit" : "Edit"}>
                    <Button
                      className={styles.actionButtons}
                      icon={<EditOutlined />}
                      type="primary"
                      ghost
                      onClick={() => handleEdit(record)}
                      disabled={record.isPredefined}
                    />
                  </Tooltip>
                  {rolePermission.rolePermission === "admin" ? (
                    <Tooltip
                      title={record.isPredefined ? "Can't Delete" : "Delete"}
                    >
                      <DeleteModal
                        title="Do you want to remove this role?"
                        handleOk={() => handleDelete(record)}
                        isDisable={record.isPredefined ? true : false}
                      />
                    </Tooltip>
                  ) : null}
                </>
              ) : null}
            </Row>
          </>
        );
      },
    },
  ];
  const handleEdit = (value: any) => {
    navigate(`/editrole/${value._id}`);
  };
  const handleDelete = async (record: any) => {
    try {
      const { data }: any = await DeleteRole(record._id);
      message.success(data.message);
      getData();
    } catch (error: any) {
      message.warning(error.response.data.message);
    }
  };

  const onClick = () => {
    navigate("/addrole");
  };
  return (
    <>
      <Breadcrumb className={styles.breadcrumbItem}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined style={{ fontSize: "20px" }} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="">Roles</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Col flex="auto" className={styles.mainSection}>
        <PageHeader
          ghost={false}
          title="Role List"
          extra={[
            <>
              {rolePermission.rolePermission === "write" ||
              rolePermission.rolePermission === "admin" ? (
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

        <Input
          allowClear
          placeholder="Search here"
          autoFocus
          className={styles.searchBox}
          onChange={(e) => onInputChange(e.target.value)}
          defaultValue={filters.search}
        />
        <div className={styles.roleTable}>
          <Table
            dataSource={tableData}
            columns={columns as any}
            loading={loading}
            locale={{ emptyText: loading ? "Loading..." : "No Data Found" }}
            className={styles.main_table}
            bordered={true}
            pagination={{
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
          />
        </div>
      </Col>
    </>
  );
};

export default RoleList;
