import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugins from "@fullcalendar/daygrid";
import interactionPlugins from "@fullcalendar/interaction";
import timeGridPlugins from "@fullcalendar/timegrid";
import { Button, Form, message, Modal, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { LeaveApproved, ListLeave, ShowLeave } from "../../Services/Leaves";
import styles from "./styles.module.less";
import TextArea from "antd/lib/input/TextArea";
const COLOR_STATUS: any = {
  pending: "#ff9800",
  approved: "#1183e1",
  rejected: "#ff5722",
};
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
  PropFromDate?: any;
  PropToDate?: any;
}
const AdminCalender: React.FC<permissionData> = (
  leavePermission: permissionData
  // { searched, PropFromDate, PropToDate }: permissionData
) => {
  const { search: locationSearch } = useLocation();
  const parsed = queryString.parse(locationSearch) || {};
  const { currentPage = 1, limit = 10, sortBy = 1, field = "" } = parsed;
  const [filters, setFilters] = useState<filtersInterface>({
    search: leavePermission.searched,
    currentPage,
    limit,
    field,
    sortBy,
    fromDate: leavePermission.PropFromDate,
    toDate: leavePermission.PropToDate,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinLoading, setSpinLoading] = useState(false);
  const [rejectDescribtion, setRejectDescription] = useState({
    about: "",
  });
  const [initialEvents, setInitialEvents] = useState([]);
  const [userData, setUserData] = useState({
    _id: "",
    description: "",
    reason: "",
    requestedBy: {
      name: "",
      _id: "",
    },
  });
  const [rejectModals, setRejectModals] = useState(false);
  const modalShow = () => {
    setRejectModals(true);
  };

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
      loadUser();
    }
    // eslint-disable-next-line
  }, [filters]);

  const loadUser = async () => {
    setLoading(true);
    setSpinLoading(true);
    try {
      const { data }: any = await ListLeave(filters);
      const newData = JSON.parse(JSON.stringify(data.data));

      const listArr: any = [];
      newData.map((element: any) => {
        const newObj = {
          start: moment(element.startDate).format("YYYY-MM-DD"),
          end: moment(element.endDate).add(1, "days").format("YYYY-MM-DD"),
          createdBy: element.createdBy,
          description: element.description,
          title: element.reason,
          requestedAt: element.requestedAt,
          id: element?.requestedBy?._id,
          requestedBy: element?.requestedBy?.name,
          status: element.status,
          totalCountDay: element.totalCountDay,
          _id: element._id,
          color: COLOR_STATUS[element.status],
        };
        listArr.push(newObj);
        return <></>;
      });
      setInitialEvents(listArr);
      setLoading(false);
      setSpinLoading(false);
    } catch (error: any) {
      message.error(error.message);
      setSpinLoading(false);
    }
  };

  const onChangeTitle = (e: any) => {
    const { name, value } = e.target;
    setRejectDescription({
      ...rejectDescribtion,
      [name]: value,
    });
  };

  const rejectOk = async () => {
    setLoading(true);
    try {
      await LeaveApproved(userData._id, {
        status: "rejected",
        leaveStatusDescription: rejectDescribtion.about,
      });
      setIsModalVisible(false);
      setRejectModals(false);
      loadUser();
      setLoading(false);
    } catch (error: any) {}
  };
  const cancel = () => {
    setRejectModals(false);
  };
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await LeaveApproved(userData._id, {
        status: "approved",
        leaveStatusDescription: "",
      });
      loadUser();
      setLoading(false);
      setIsModalVisible(false);
    } catch (error: any) {}
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalVisible(false);
    // setStatus("approved");
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleReject = () => {
    modalShow();
  };
  const { reason, description, requestedBy } = userData;
  const handleEventClick = async (clickInfo: EventClickArg) => {
    const leaveId: any = clickInfo.event._def.extendedProps._id;
    if (
      leavePermission.leavePermission === "admin" ||
      leavePermission.leavePermission === "write"
    ) {
      try {
        const { data }: any = await ShowLeave(leaveId);
        setUserData(data.data);
      } catch (error: any) {
        message.error(error.message);
      }
      showModal();
    }
  };
  const handleDateSelect = (selectInfo: DateSelectArg) => {};

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>
          {eventContent.event.extendedProps.requestedBy?.toLocaleUpperCase()}
        </b>
        &nbsp;
        <b>-{eventContent.event.title.toLocaleUpperCase()}</b>
      </>
    );
  };

  return (
    <>
      <div className={styles.mainSection}>
        <Spin className={styles.loader} spinning={spinLoading} />
        <FullCalendar
          plugins={[dayGridPlugins, timeGridPlugins, interactionPlugins]}
          events={initialEvents}
          initialEvents={initialEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          select={handleDateSelect}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          selectable={true}
          editable={
            leavePermission.leavePermission === "admin" ||
            leavePermission.leavePermission === "write"
              ? true
              : false
          }
        />
        <Modal
          title="Leave Event"
          centered
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              Approve
            </Button>,
            leavePermission.leavePermission === "admin" ? (
              <Button
                key="back"
                type="primary"
                onClick={handleReject}
                loading={loading}
                danger
              >
                Reject
              </Button>
            ) : null,
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <Form
            labelCol={{ xs: { span: 12 } }}
            wrapperCol={{ xs: { span: 12 } }}
            form={form}
            onFinish={onFinish}
            scrollToFirstError
          >
            <Link to={`/details/${requestedBy._id}`}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ message: "This field is required." }]}
              >
                <p>
                  {requestedBy.name.charAt(0).toUpperCase() +
                    requestedBy.name.slice(1)}
                </p>
              </Form.Item>
            </Link>
            <Form.Item name="title" label="Title">
              <p>{reason.charAt(0).toUpperCase() + reason.slice(1)}</p>
            </Form.Item>
            <Form.Item name="description" label="Description">
              <p>
                {description.charAt(0).toUpperCase() + description.slice(1)}
              </p>
            </Form.Item>
          </Form>
        </Modal>
        <div>
          <div>
            <Modal
              title="Reason of reject leave"
              centered
              visible={rejectModals}
              onOk={rejectOk}
              onCancel={cancel}
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
      </div>
    </>
  );
};
export default AdminCalender;
