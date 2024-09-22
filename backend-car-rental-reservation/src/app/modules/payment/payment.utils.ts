import config from '../../config'
import axios from 'axios'
import { TBPaymentProps } from '../../interface'

// client - https://client-car-rental-reservation.vercel.app
// backend- https://server-car-rental-reservation.vercel.app

const initiatePayment = async (customerInfo: TBPaymentProps) => {
  const res = await axios.post(config.PAYMENT_URL!, {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    cus_name: customerInfo?.cus_name,
    cus_email: 'rafi@softbd.com',
    cus_phone: customerInfo?.cus_phone,
    cus_add1: customerInfo?.cus_add1,
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    amount: customerInfo?.amount,
    tran_id: customerInfo.trx_id,
    currency: 'BDT',
    success_url:`https://server-car-rental-reservation.vercel.app/api/payment/success?id=${customerInfo?.id}`,
    fail_url: 'https://server-car-rental-reservation.vercel.app/api/payment/failed',
    cancel_url: 'https://client-car-rental-reservation.vercel.app/dashboard/my-bookings',
    desc: 'Lend Money',
    type: 'json',
  })

  return res?.data
}



export default initiatePayment
