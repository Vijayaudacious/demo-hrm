import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Col,
  message,
  Row,
  Table,
  Tag,
  Modal,
  Input,
  Tooltip,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { LeaveApproved, ListLeave } from "../../../Services/Leaves";
import styles from "./styles.module.less";
import type { RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/lib/input/TextArea";

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
  timer?: void;
  PropFromDate?: any;
  PropToDate?: any;
}

const ListView: React.FC<permissionData> = (
  leavePermission: permissionData,
  { searched, PropFromDate, PropToDate }: permissionData
) => {
  const { RangePicker } = DatePicker;
  const { search: locationSearch } = useLocation();
  const parsed = queryString.parse(locationSearch) || {};
  const { currentPage = 1, limit = "", sortBy = 1, field = "" } = parsed;

  const [tableData, setTableData] = useState([]);
  const [rejectLeave, setRejectLeave] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectDescribtion, setRejectDescription] = useState({
    about: "",
  });
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
  const onInputChange = debounce(async (search: any) => {
    setFilters({ ...filters, search });
  }, 1000);

  const [filters, setFilters] = useState<filtersInterface>({
    search: leavePermission.searched,
    currentPage,
    limit,
    field,
    sortBy,
    fromDate: leavePermission.PropFromDate,
    toDate: leavePermission.PropToDate,
  });
  useEffect(() => {
    setFilters({
      ...filters,
      search: leavePermission.searched,
      fromDate: leavePermission.PropFromDate,
      toDate: leavePermission.PropToDate,
    });
    // eslint-disable-next-line
  }, [leavePermission]);

  useEffect(() => {
    // let searched = queryString.stringify(filters);
    if (
      leavePermission.leavePermission === "read" ||
      leavePermission.leavePermission === "write" ||
      leavePermission.leavePermission === "admin"
    ) {
      listLoad();
    }
    // eslint-disable-next-line
  }, [filters]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setFilters({
      ...filters,
      field: sorter.field,
      sortBy: sorter.order,
      currentPage: pagination.current,
      limit: pagination.pageSize.totalRecords,
    });
  };
  const listLoad = async () => {
    setLoading(true);
    try {
      const { data }: any = await ListLeave(filters);
      const ListNewData = data.data;
      const arr: any = [];
      ListNewData.map((element: any) => {
        const obj = {
          start: element.startDate,
          end: element.endDate,
          createdBy: element.createdBy,
          description: element.description,
          reason: element.reason,
          _id: element._id,
          requestedAt: element.requestedAt,
          name: element?.requestedBy?.name,
          status: element.status,
          totalCountDay: element.totalCountDay,
        };

        arr.push(obj);
        return <></>;
      });
      setTableData(arr);
      setLoading(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (record: any) => {
    try {
      await LeaveApproved(record._id, {
        status: "rejected",
        leaveStatusDescription: rejectDescribtion.about,
      });
      listLoad();
    } catch (error) {}
    setIsModalVisible(false);
  };
  const onChangeTitle = (e: any) => {
    const { name, value } = e.target;
    setRejectDescription({
      ...rejectDescribtion,
      [name]: value,
    });
  };
  const columns = [
    {
      title: "S.No.",
      key: "index",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Start Date",
      key: "start",
      dataIndex: "start",
      render: (start: any) => {
        return <>{dayjs(start).format("DD-MMM-YYYY")}</>;
      },
    },
    {
      title: " End Date",
      key: "end",
      dataIndex: "end",
      render: (end: any) => {
        return <>{dayjs(end).format("DD-MMM-YYYY")}</>;
      },
    },

    {
      title: "Total Leave Days",
      dataIndex: "totalCountDay",
      key: "totalCountDay",
    },
    {
      title: "Requested By",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Title",
      key: "reason",
      dataIndex: "reason",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: any, record: any) => {
        let color;
        if (status === "approved") {
          color = "blue";
        } else if (status === "pending") {
          color = "gold";
        } else {
          color = "red";
        }
        return (
          <>
            <Tag color={color}>{status.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Request At",
      key: "requestedAt",
      dataIndex: "requestedAt",
      width: "1.5%",
      render: (requestedAt: any) => {
        return <>{dayjs(requestedAt).format("DD-MMM-YYYY hh:mm A")}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "1.5%",
      render: (record: any) => {
        return (
          <>
            {leavePermission.leavePermission === "admin" ||
            leavePermission.leavePermission === "write" ? (
              <>
                <Tooltip title="Approve">
                  <CheckOutlined
                    onClick={async () => {
                      try {
                        await LeaveApproved(record._id, {
                          status: "approved",
                          leaveStatusDescription: "",
                        });
                        listLoad();
                      } catch (error: any) {
                        message.error(error.message);
                      }
                    }}
                  >
                    Approve
                  </CheckOutlined>
                </Tooltip>
                {leavePermission.leavePermission === "admin" ? (
                  <Tooltip title="Reject">
                    <CloseOutlined
                      onClick={() => {
                        showModal();
                        setRejectLeave(record);
                      }}
                    >
                      Reject
                    </CloseOutlined>
                  </Tooltip>
                ) : null}
              </>
            ) : (
              "no action"
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className={styles.listView}>
        <Row gutter={12}>
          <Col lg={8} xs={24}>
            <h4>Search Here</h4>
            <Input
              allowClear
              placeholder="Search here"
              autoFocus
              className={styles.searchBox}
              onChange={(e) => onInputChange(e.target.value)}
              defaultValue={filters.search}
            />
          </Col>
          <Col lg={8} xs={24}>
            <h4> Dates</h4>

            <RangePicker
              format="YYYY-MM-DD"
              onChange={onDateChange}
              className={styles.searchBox}
              showTime
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={tableData}
              columns={columns}
              bordered={false}
              loading={loading}
              locale={{ emptyText: loading ? " Loading..." : "No Data Found" }}
              pagination={{
                showSizeChanger: true,
              }}
              onChange={handleTableChange}
            />
          </Col>
        </Row>
        <Modal
          title="Reason of reject leave"
          visible={isModalVisible}
          onOk={() => handleOk(rejectLeave)}
          onCancel={handleCancel}
          centered
        >
          <TextArea
            rows={4}
            value={rejectDescribtion.about}
            name="about"
            onChange={(e) => onChangeTitle(e)}
          />
        </Modal>
      </div>
    </>
  );
};

export default ListView;
