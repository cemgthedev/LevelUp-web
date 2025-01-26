import React from "react";

import { USER_PERMISSIONS } from "@/constants/tokens";
import {
  PermissionAllowedType,
  PermissionNameType,
  PermissionType,
} from "@/types/permission";
import { cache } from "@/utils/cache.util";

export const usePermission = (
  pagePermission: PermissionNameType,
  defaultValue: PermissionAllowedType = "read"
) => {
  const [permission, setPermission] =
    React.useState<PermissionAllowedType | null>(defaultValue || "read");

  React.useEffect(() => {
    const permissions = cache.getValue(USER_PERMISSIONS);
    const permissionsArray: PermissionType[] = permissions
      ? JSON.parse(permissions)
      : [];

    const permissionFinded = permissionsArray.find(
      (perm) => perm.name === pagePermission
    );
    setPermission(permissionFinded?.permission || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { permission };
};
