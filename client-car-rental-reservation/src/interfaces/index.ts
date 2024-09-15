export type TCar = {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  image: string;
  category: string;
  reviews: number;
  color: string;
  isElectric: boolean;
  status: string;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};

export type TUser = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: "user" | "admin" | string;
  password?: string;
  confirmPassword?: string;
  terms?: boolean;
  status?: string;
};

export type TBooking = {
  _id?: string;
  user: TUser;
  car: TCar;
  startTime: string;
  endTime: string;
  totalCost: number;
  date?: string;
  time?: string;
  approved?: boolean;
  isCancel?: boolean;
};

export type TBookingState = {
  _id?: string;
  carId: string;
  date: string;
  startTime: string;
  booking?: TCar | null;
  name: string;
  address: string;
  phone: string;
  license: string;
  nid: string;
  gps: boolean;
  childSeat: boolean;
  time?: string;
  endTime?: string;
  totalCost?: number;
  approved?: boolean;
  isCancel?: boolean;
};


export type TUserState = {
  user: {name: string, email: string}
  token: string
 
};