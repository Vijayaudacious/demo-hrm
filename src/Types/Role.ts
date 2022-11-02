import { Permission } from "./Permission";

export default interface Roles {
  _id: string;
  createdBy: string;
  name: string;
  description: string;
  isPredefined: boolean;
  status: string;
  permission: Permission;
  abc: string;
}
// export type { Roles };
