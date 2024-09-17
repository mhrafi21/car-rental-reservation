import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentServices } from "./payment.services";

const createPayment = catchAsync(async(req,res) => {
    const {bookingId} = req.body;
    const result = await paymentServices.createPaymentServices(bookingId as string);

    try {
        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'Payment created successfully',
            data: result,
        })
        
    } catch (error) {
        console.log("payment error", error);
    }
 
})

const confirmPayment = catchAsync(async(req,res) => {
    const {id} = req.query;
    const result = await paymentServices.confirmationPaymentServices(id as string);
    
    res.send(result);

})

const failedPayment = catchAsync(async(req,res) => {

    const result = await paymentServices.failedPaymentServices();
    res.send(`<h3>Payment ${result}</h3>`);
})

export const paymentControllers = {
    createPayment,
    confirmPayment,
    failedPayment,
}