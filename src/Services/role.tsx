import { apiCaller } from "../Utils/RestApi";
import querystring from "querystring";

export const Roles = ({
  search,
  currentPage,
  limit,
  field,
  sortBy,
}: {
  search: string;
  currentPage: number | string;
  limit: number | string;
  field: string;
  sortBy: number | string;
}): Promise<{ token: string }> =>
  apiCaller(
    `/?${querystring.stringify({
      search,
      currentPage,
      limit,
      field,
      sortBy,
    })}`,
    undefined,
    "get",
    undefined,
    process.env.REACT_APP_ROLE_API
  );
export const AllRoles = ({
  search,
  limit,
}: {
  search: string;
  limit: number | string;
}): Promise<{ token: string }> =>
  apiCaller(
    `/?${querystring.stringify({
      search,
      limit,
    })}`,
    undefined,
    "get",
    undefined,
    process.env.REACT_APP_ROLE_API
  );

export const addRole = ({
  name,
  description,
  permission,
}: {
  name: string;
  description: string;
  permission: any;
}): Promise<{ token: string }> =>
  apiCaller(
    `/`,
    {
      name,
      description,
      permission,
    },
    "post",
    undefined,
    process.env.REACT_APP_ROLE_API
  );

export const roleDetail = (id: string): Promise<{}> =>
  apiCaller(
    `/${id}`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_ROLE_API
  );
export const DeleteRole = (id: string | number): Promise<{}> =>
  apiCaller(
    `/${id}`,
    undefined,
    "DELETE",
    undefined,
    process.env.REACT_APP_ROLE_API
  );
export const EditRole = (id: string, formData: object): Promise<{}> =>
  apiCaller(
    `/${id}`,
    formData,
    "PUT",
    undefined,
    process.env.REACT_APP_ROLE_API
  );
export const DashboardTotalRole = (): Promise<{ token: string }> =>
  apiCaller(
    `/dashboardRole`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_ROLE_API
  );

export const DashboardTotalUser = (): Promise<{ token: string }> =>
  apiCaller(
    `/dashboardUser`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_ROLE_API
  );
export const RolePage = (currentPage: any, limit: any): Promise<{}> =>
  apiCaller(
    `/?currentPage=${currentPage}&limit=${limit}`,
    {
      params: {
        currentPage,
        limit,
      },
    },
    "GET",
    undefined,
    process.env.REACT_APP_ROLE_API
  );
export const SearchRoles = (search: any): Promise<{}> =>
  apiCaller(
    `/?search=${search}`,
    search,
    "GET",
    undefined,
    process.env.REACT_APP_ROLE_API
  );
