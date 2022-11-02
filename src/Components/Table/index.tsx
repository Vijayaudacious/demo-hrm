import React from "react";
import { Table as AntdTable } from "antd";
interface CustomTableProp {
  columns: any[];
  loading: boolean;
  dataSource: any[];
  handleChange: any;
}
const Table: React.FC<CustomTableProp> = ({
  columns,
  loading,
  dataSource,
  handleChange,
}) => {
  return (
    <AntdTable
      columns={columns}
      loading={loading}
      bordered={false}
      locale={{ emptyText: loading ? "Loading..." : "No Data Found" }}
      pagination={{
        showSizeChanger: true,
      }}
      dataSource={dataSource}
      onChange={handleChange}
    />
  );
};

export default Table;
