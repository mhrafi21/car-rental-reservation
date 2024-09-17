
import { TBPaymentProps } from "../../interface";
import { bookingModels } from "../booking/booking.model";
import initiatePayment from "./payment.utils";
import {join} from "path";
import {readFileSync} from "fs";
const createPaymentServices = async(bookingId: string) => {

    const bookingInfo = await bookingModels.BookingModel.findById(bookingId).populate("user");

    try {
        const customerInfo = {
            id: bookingId,
            trx_id: Math.random(),
            cus_name: bookingInfo?.name,
            cus_phone: bookingInfo?.phone,
            cus_add1: bookingInfo?.address,
            amount: (bookingInfo?.totalCost)?.toString()
        }
    
        const result = await initiatePayment(customerInfo as TBPaymentProps);
        return result;
    } catch (error) {
        console.log("payment process is erorr", error);
    }
}

const confirmationPaymentServices = async(id: string) => {

    try {
        await bookingModels.BookingModel.findByIdAndUpdate(id, {
            paymentStatus: 'paid'
        })
        const filePath = join(__dirname,'../../../views/confirmation.html')
        const template = readFileSync(filePath, 'utf-8');
        return template;
    } catch (error) {
        console.log("payment confirmation error", error);
    }

}

const failedPaymentServices = async() => {
    const result = "Failed";
    return result;
}

export const paymentServices = {
    createPaymentServices,
    confirmationPaymentServices,
    failedPaymentServices
} 