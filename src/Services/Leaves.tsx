import { apiCaller } from "../Utils/RestApi";
import querystring from "querystring";
export const LeaveRequest = ({
  requestedBy,
  reason,
  startDate,
  endDate,
  description,
}: {
  requestedBy: any;
  reason: any;
  startDate: any;
  endDate: any;
  description: any;
}): Promise<{ token: string }> =>
  apiCaller(
    `/`,
    {
      requestedBy,
      reason,
      startDate,
      endDate,
      description,
    },
    "post",
    undefined,
    process.env.REACT_APP_LEAVE_API
  );
export const ListLeave = ({
  search,
  currentPage,
  limit,
  field,
  sortBy,
  fromDate,
  toDate,
}:{
  search: string;
  currentPage: number | string;
  limit: number | string;
  field: string;
  sortBy: number | string;
  fromDate: string | number;
  toDate: string | number;
}): Promise<{ token: string }> =>
  apiCaller(
    `/list?${querystring.stringify({
      search,
      currentPage,
      limit,
      field: "name",
      sortBy,
      fromDate,
      toDate,
    })}`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_LEAVE_API
  );
export const DashboardTotalLeave = (): Promise<{ token: string }> =>
  apiCaller(
    `/dashboardLeave`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_LEAVE_API
  );
export const UserLeave = (id: any): Promise<{ token: string }> =>
  apiCaller(
    `/list/${id}`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_LEAVE_API
  );
export const ShowLeave = (id: any): Promise<{ token: string }> =>
  apiCaller(
    `/leave/${id}`,
    undefined,
    "GET",
    undefined,
    process.env.REACT_APP_LEAVE_API
  );
export const LeaveApproved = (
  id: any,
  {
    status,
    leaveStatusDescription,
  }: {
    status: any;
    leaveStatusDescription: any;
  }
): Promise<{ token: string }> =>
  apiCaller(
    `/${id}`,
    {
      status,
      leaveStatusDescription,
    },
    "PUT",
    undefined,
    process.env.REACT_APP_LEAVE_API
  );
