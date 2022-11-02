import { message, Modal, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { UserLeave, LeaveApproved } from "../../../Services/Leaves";
import { useParams } from "react-router-dom";
import styles from "./styles.module.less";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/lib/table";
import TextArea from "antd/lib/input/TextArea";
interface DataType {
  key: string;
  name: string;
  status: string[];
}
interface permissionData {
  userPermission?: string;
}
const UserList: React.FC<permissionData> = (userPermission: permissionData) => {
  const { id } = useParams();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectDescribtion, setRejectDescription] = useState({
    about: "",
  });
  useEffect(() => {
    UserList(id);
    // eslint-disable-next-line
  }, []);

  const UserList = async (id: any) => {
    setLoading(true);
    try {
      const { data }: any = await UserLeave(id);
      const listdata = JSON.parse(JSON.stringify(data.data));
      let newArr: any = [];
      listdata.map((element: any) => {
        const objt = {
          createdBy: element.createdBy,
          description: element.description,
          end: element.endDate,
          start: element.startDate,
          title: element.reason,
          requestedAt: element.requestedAt,
          requestedBy: element.requestedBy,
          status: element.status,
          totalCountDay: element.totalCountDay,
          _id: element._id,
        };
        newArr.push(objt);
        return <></>;
      });
      setTableData(newArr);
      setLoading(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeTitle = (e: any) => {
    const { name, value } = e.target;
    setRejectDescription({
      ...rejectDescribtion,
      [name]: value,
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "S.No.",
      key: "index",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Start Date",
      dataIndex: "start",
      key: "start",
      width: "1.5%",
      render: (start: any) => {
        return <>{dayjs(start).format("DD-MMM-YYYY")}</>;
      },
    },
    {
      title: " End Date",
      dataIndex: "end",
      key: "end",
      width: "1.5%",
      render: (end: any) => {
        return <>{dayjs(end).format("DD-MMM-YYYY")}</>;
      },
    },
    {
      title: "Total Leave Days",
      dataIndex: "totalCountDay",
      key: "totalCountDay",
      width: ".2%",
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
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
      render: (status: any) => {
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
        return <>{dayjs(requestedAt).format("DD-MMM-YYYY")}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "1.5%",
      render: (record: any) => {
        return (
          <>
            {userPermission.userPermission === "write" ||
            userPermission.userPermission === "admin" ? (
              <CheckOutlined
                onClick={async () => {
                  setLoading(true);
                  try {
                    await LeaveApproved(record._id, {
                      status: "approved",
                      leaveStatusDescription: "",
                    });
                    setLoading(false);
                    UserList(id);
                  } catch (error: any) {
                    message.error(error.message);
                  }
                }}
              >
                Approve
              </CheckOutlined>
            ) : (
              "no action"
            )}

            {userPermission.userPermission === "admin" ? (
              <CloseOutlined
                onClick={async () => {
                  showModal();
                  setLoading(true);
                  try {
                    await LeaveApproved(record._id, {
                      status: "rejected",
                      leaveStatusDescription: rejectDescribtion.about,
                    });
                    UserList(id);
                    setLoading(false);
                  } catch (error: any) {
                    message.error(error.message);
                  }
                }}
              >
                Reject
              </CloseOutlined>
            ) : null}
          </>
        );
      },
    },
  ];
  return (
    <div className={styles.main}>
      <Table
        dataSource={tableData}
        locale={{ emptyText: loading ? "Loading..." : "No Data Found" }}
        columns={columns}
      />
      <div>
        <Modal
          title="Reason of reject leave"
          visible={isModalVisible}
          onOk={handleOk}
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
    </div>
  );
};
export default UserList;
