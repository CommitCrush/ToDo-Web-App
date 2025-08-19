import {InferSchemaType} from "mongoose";
import { userSchema } from "../models/user.js";
import { Permission } from "./permissions.js";

//Usertype funktioniert jetzt überall: JWT, middleware, req.user, usw.

type BaseUser = InferSchemaType<typeof userSchema>;

export interface UserType extends Omit<BaseUser, "permissions"> {
  permissions: Permission[];
}
