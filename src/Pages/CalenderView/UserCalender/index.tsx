import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugins from "@fullcalendar/interaction";
import timeGridPlugins from "@fullcalendar/timegrid";
import { Button, Form, Input, message, Modal,Tooltip,Checkbox } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { LeaveRequest, UserLeave } from "../../../Services/Leaves";
import styles from "./styles.module.less";

const COLOR_STATUS: any = {
  pending: "#ff9800",
  approved: "#1183e1",
  rejected: "#ff5722",
};
interface permissionData {
  userPermission?: string;
}

const UserCalender: React.FC<permissionData> = (
  userPermission: permissionData
) => {
  const { id }: any = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = React.useState<Array<EventApi>>([]);
  useEffect(() => {}, [events]);
  const handleEvents = (events: EventApi[]) => {
    setEvents(events);
  };
  const [formValues, setFormValues] = useState({
    description: "",
    title: "",
    start: "",
    end: "",
    _id: "",
  });

  const { mutateAsync: leaveMutation } = useMutation(LeaveRequest);
  useEffect(() => {
    LeaveList(id);
    // eslint-disable-next-line
  }, []);
  const [form] = Form.useForm();

  const LeaveList = async (id: any) => {
    try {
      const { data }: any = await UserLeave(id);
      const newdata = JSON.parse(JSON.stringify(data.data));
      let arry: any = [];
      newdata.map((element: any) => {
        const objt = {
          createdBy: element.createdBy,
          description: element.description,
          start: moment(element.startDate).format("YYYY-MM-DD"),
          end: moment(element.endDate).add(1, "days").format("YYYY-MM-DD"),
          title: element.reason,
          requestedAt: element.requestedAt,
          requestedBy: element.requestedBy,
          status: element.status,
          totalCountDay: element.totalCountDay,
          color: COLOR_STATUS[element.status],
        };
        arry.push(objt);
        return <></>;
      });
      setInitialEvents(arry);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onFinish = async (values: any) => {
    setIsModalVisible(false);
    const { title, description, start, end } = values;
    setLoading(true);
    try {
      const { data }: any = await leaveMutation({
        description,
        requestedBy: id,
        reason: title,
        startDate: start,
        endDate: end,
      });
console.log(data)
      setLoading(false);
      setIsModalVisible(false);
      LeaveList(id);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };
  console.log(onFinish)
  const showModal = () => {
    setIsModalVisible(true);
  };
console.log(setFormValues)
  const handleOk = async () => {
    form.submit();
    setLoading(true);
    try {
      const { data }: any = await leaveMutation({
        description: formValues.description,
        requestedBy: id,
        reason: formValues.title,
        startDate: formValues.start,
        endDate: formValues.end,
      });
      setIsModalVisible(false);
      setLoading(false);
      LeaveList(id);
      console.log(data)
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [initialEvents, setInitialEvents] = useState([]);
  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.event.title}</b>
      </>
    );
  };
  const onChangeTitle = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleEventClick = (clickInfo: EventClickArg) => {};
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (
      userPermission.userPermission === "admin" ||
      userPermission.userPermission === "write"
    ) {
      showModal();
    }
    form.setFieldsValue({
      title: null,
      description: null,
      start: selectInfo.startStr,
      end: moment(selectInfo.end).subtract(1, "days").format("YYYY-MM-DD"),
    });
  };
  return (
    <>
      <div className={styles.main}>
        {loading}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugins, interactionPlugins]}
          initialEvents={initialEvents}
          timeZone="local"
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          select={handleDateSelect}
          events={initialEvents}
          weekends={true}
          selectable={true}
          eventsSet={handleEvents}
          editable={true}
        />
        <Modal
        title="Add Events"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Request Leave
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          wrapperCol={{ xs: { span: 24 } }}
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ start: formValues.start }}
          scrollToFirstError
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <Tooltip title="Reason why you need to leave" color={"blue"}>
              <Input
                name="title"
                value={formValues.title}
                onChange={(e) => onChangeTitle(e)}
              />
            </Tooltip>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea
              name="description"
              value={formValues.description}
              onChange={(e) => onChangeTitle(e)}
              showCount
              maxLength={100}
            />
          </Form.Item>
          <Form.Item initialValue={formValues.start} label="Start Date">
            <Input name="start" value={formValues.start} type="date" />
          </Form.Item>
          <Form.Item initialValue={formValues.end} label="End Date">
            <Input name="end" value={formValues.end} type="date" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}
          >
            <Checkbox>All Day</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      </div>
    </>
  );
};
export default UserCalender;