import React from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
const Model = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = async () => {
    form.submit();
    setLoading(true);
    try {
      const { data } = await leaveMutation({
        description: formValues.description,
        requestedBy: id,
        reason: formValues.title,
        startDate: formValues.start,
        endDate: formValues.end,
      });
      setIsModalVisible(false);
      setLoading(false);
      LeaveList(id);
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };
  return (
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
    
    </Form>
  </Modal>
  );
};

export default Model;
