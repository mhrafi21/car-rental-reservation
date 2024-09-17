import { Router } from 'express'
import { paymentControllers } from './payment.controller'

const router = Router()

router.post('/', paymentControllers.createPayment)
router.post('/success', paymentControllers.confirmPayment)
router.post('/failed', paymentControllers.failedPayment)

export const paymentRoutes = router
