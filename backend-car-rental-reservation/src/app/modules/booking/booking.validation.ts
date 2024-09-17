import { z } from 'zod'

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string(), // Validates a non-empty string
    user: z.string().optional(), // Assuming ObjectId is represented as a string, and it's optional
    car: z.string().optional(),
    paymentStatus: z.enum(['pending', 'paid', 'cancelled']).default('pending').optional(),  // Same as user
    startTime: z.string(), // Validates a non-empty string
    endTime: z.string().optional(), // Optional endTime, can be null
    totalCost: z.number().min(0).default(0), // Validates totalCost as a number and sets a default value
    name: z.string({invalid_type_error: "name is required"}), // Validates non-empty name
    address: z.string({invalid_type_error: "Address is required"}), // Validates non-empty address
    phone: z.string({invalid_type_error: "Phone is required"}), // Validates non-empty phone
    license: z.string({invalid_type_error: "license is required"}), // Validates non-empty license
    nid: z.string({invalid_type_error: "nid is required"}), // Validates non-empty NID
    gps: z.boolean().optional(), // Validates boolean gps
    childSeat: z.boolean().optional(), // Validates boolean childSeat
    approved: z.boolean().default(false), // Validates boolean approved, defaults to false
    isCancel: z.boolean().default(false), // Validates boolean isCancel, defaults to false
  }),
})

const updateBookingValidationSchema = z.object({
  body: z.object({
    bookingId: z.string().optional(),
    endTime: z.string().optional(),
  }),
})

export const bookingValidation = {
  bookingValidationSchema,
  updateBookingValidationSchema,
}
