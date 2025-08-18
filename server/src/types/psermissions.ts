export type Permission =
  | "CREATE_USER"
  | "VIEWER_USER"
  | "UPDATE_USER"
  | "DELETE_USER";

// Admin
const adminPermissions: Permission[] = [
  "CREATE_USER",
  "VIEWER_USER",
  "UPDATE_USER",
  "DELETE_USER",
];

// Normaler User
const userPermissions: Permission[] = ["VIEWER_USER", "UPDATE_USER"];
