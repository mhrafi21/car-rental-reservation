import config from '../../config'
import axios from 'axios'
import { TBPaymentProps } from '../../interface'
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
    success_url: `http://localhost:5000/api/payment/success?id=${customerInfo?.id}`,
    fail_url: 'http://localhost:5000/api/payment/failed',
    cancel_url: 'http://localhost:5173/dashboard/my-bookings',
    desc: 'Lend Money',
    type: 'json',
  })

  return res?.data
}



export default initiatePayment
