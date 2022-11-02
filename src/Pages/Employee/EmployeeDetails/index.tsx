import React, { useState } from "react";
import { message, Col, Row, PageHeader, Radio } from "antd";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./styles.module.less";
import { useParams } from "react-router-dom";
import { ResetPassword } from "../../../Services/Users";
import UserCalender from "../../CalenderView/UserCalender";
import UserList from "../UserList";
import AddEmployee from "../AddEmployee";
import DeleteModal from "../../../Components/DeleteModal";

interface headerInterface {
  permission: {
    _id?: string;
    dashBoard?: string;
    user?: string;
    role?: string;
    leave?: string;
  };
}
const UserDetails: React.FC<headerInterface> = (props: headerInterface) => {
  const { user } = props.permission;

  const [listShow, setListShow] = useState(true);
  let { id }: any = useParams();
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "Calander view", value: true },
    { label: "List view", value: false },
  ];
  const onChangeToggle = (e: any) => {
    setListShow(e.target.value);
  };
console.log(loading)
  const RegeneratePasswordConfirm = async () => {
    setLoading(true);
    try {
      const { data }: any = await ResetPassword(id);
      message.info("Reset password successfully");
      setLoading(false);
      console.log(data)
    } catch (error: any) {
      message.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <Row className={styles.child}>
        <Col span={24}>
          <PageHeader
            className={styles.pageHead}
            extra={[
              user === "write" || user === "admin" ? (
                <DeleteModal
                  title="Do you want to regenerate the password ?"
                  handleOk={RegeneratePasswordConfirm}
                  name=" Regenerate Password"
                  isDeleteItem
                />
              ) : null,
            ]}
          >
            <AddEmployee />
          </PageHeader>
        </Col>
        <Col span={24}>
          <Radio.Group
            options={options}
            onChange={onChangeToggle}
            defaultValue={true}
            optionType="button"
            buttonStyle="solid"
            className={styles.calButton}
          />
        </Col>
      </Row>
      {listShow ? (
        <UserCalender userPermission={user} />
      ) : (
        <UserList userPermission={user} />
      )}
    </div>
  );
};
export default UserDetails;