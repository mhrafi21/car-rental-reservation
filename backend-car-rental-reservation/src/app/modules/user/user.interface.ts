import { USER_ROLE } from './user.constant'

export type TUser = {
  _id?:string,
  id?: string,
  name: string
  email: string
  role: 'user' | 'admin'
  password: string,
  confirmPassword: string;
  terms: boolean;
  status: "active" | "blocked"
}

export type TUserRole = keyof typeof USER_ROLE
