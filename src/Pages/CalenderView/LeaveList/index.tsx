import React from "react";
import ListView from "../ListView";
import styles from "./styles.module.less";
interface permissionData {
  leavePermission?: string;
  searched?: any;
  PropFromDate?: any;
  PropToDate?: any;
}
const LeaveList: React.FC<permissionData> = (
  leavePermission: permissionData,
  { searched, PropFromDate, PropToDate }: permissionData
) => {
  return (
    <div className={styles.listTable}>
      <ListView
        leavePermission="admin"
        searched={leavePermission.searched}
        PropFromDate={leavePermission.PropFromDate}
        PropToDate={leavePermission.PropToDate}
      />
    </div>
  );
};
export default LeaveList;
