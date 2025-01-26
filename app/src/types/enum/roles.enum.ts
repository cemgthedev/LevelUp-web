export enum Roles {
  ADMIN = "admin",
  ENTERPRISE = "enterprise",
  INSTITUTION = "institution",
  REPRESENTATIVE = "representative",
}

export type RolesType =
  | Roles.ADMIN
  | Roles.ENTERPRISE
  | Roles.INSTITUTION
  | Roles.REPRESENTATIVE;
