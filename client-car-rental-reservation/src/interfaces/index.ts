export type TCar = {
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
  id: string
  name: string;
  email: string;
  role?: "user" | "admin";
  password?: string;
  confirmPassword?: string;
  terms?: boolean;
  status: string
};

export type TBooking = {
  _id?: string;
  user: TUser;
  car: TCar;
  startTime: string;
  endTime: string;
  totalCost: number;
  date?: string
  time?: string
  approved?: boolean
  isCancel?: boolean
};

export type TProduct = {
  _id?: string;
  name: string;
  price: number;
  stockQuantity: number;
  description: string;
  category: string;
  ratings: number;
  images: string[];
  deleteImages?: string;
};

export type TCartsProps = {
  _id?: string;
  product: TProduct;
  name: string;
  price: number;
  stockQuantity: number;
  description: string;
  category: string;
  ratings: number;
  images: string[];
  quantity: number;
};

// Define the TProduct type
export type TProductCart = {
  price: number;
  stockQuantity: number;
};
