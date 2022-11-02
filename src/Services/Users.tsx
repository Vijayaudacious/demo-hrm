import { apiCaller } from "../Utils/RestApi";
import querystring from "querystring";

export const Users = ({
  search,
  currentPage,
  limit,
  field,
  sortBy,
  fromDate,
  toDate,
}: {
  search?: string;
  currentPage?: number | string;
  limit?: number | string;
  field?: string;
  sortBy?: number | string;
  fromDate?: string | number;
  toDate?: string | number;
}): Promise<{ token: string }> =>
  apiCaller(
    `/?${querystring.stringify({
      search,
      currentPage,
      limit,
      field,
      sortBy,
      fromDate,
      toDate,
    })}`,
    undefined,
    "get",
    undefined,
    process.env.REACT_APP_USER_API
  );

export const AddUser = (formData: object): Promise<{}> =>
  apiCaller(`/`, formData, "POST", undefined, process.env.REACT_APP_USER_API);

export const DeleteUser = (id: string | number): Promise<{}> =>
  apiCaller(
    `/${id}`,
    undefined,
    "DELETE",
    undefined,
    process.env.REACT_APP_USER_API
  );
export const DeleteDocument = (
  id: string | number,
  documentId: { docId: string | number }
): Promise<{}> =>
  apiCaller(
    `/doc/${id}`,
    documentId,
    "DELETE",
    undefined,
    process.env.REACT_APP_USER_API
  );

export const EditDocument = (
  editingFileIndex: string | number,
  formData: object
): Promise<{}> =>
  apiCaller(
    `/doc/${editingFileIndex}`,
    formData,
    "PUT",
    undefined,
    process.env.REACT_APP_USER_API
  );

export const EditUser = (id: string, formData: object): Promise<{}> =>
  apiCaller(
    `/${id}`,
    formData,
    "PUT",
    undefined,
    process.env.REACT_APP_USER_API
  );
export const UserDetail = (id: string | undefined): Promise<{}> =>
  apiCaller(
    `/${id}`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_USER_API
  );
export const ResetPassword = (id: string): Promise<{}> =>
  apiCaller(
    `/reset-password/${id}`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_USER_API
  );
export const AllPermissions = (): Promise<{}> =>
  apiCaller(
    `/permission/all`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_USER_API
  );