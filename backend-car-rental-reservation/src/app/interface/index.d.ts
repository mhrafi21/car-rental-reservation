import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}


interface TBPaymentProps {
  id: string;
  cus_name: string;
  cus_phone: string;
  cus_add1: string;
  amount: string;
  trx_id: number;
}