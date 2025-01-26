
import { USER_PERMISSIONS } from "@/constants/tokens";
import { PermissionType } from "@/types/permission";
import { cache } from "./cache.util";

export const getSidebarPermissions = () => {
  const permissions = cache.getValue(USER_PERMISSIONS);
  const permissionsArray: PermissionType[] = permissions
    ? JSON.parse(permissions)
    : [];

  return permissionsArray.map((perm) => perm.name);
};
