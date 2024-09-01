import { z } from 'zod'

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      invalid_type_error: 'Date must be string',
    }),
    user: z.string().optional(),
    car: z.string().optional(),
    startTime: z.string({
      invalid_type_error: 'start time must be string',
    }),
    endTime: z.string().nullable().default(null),
    totalCost: z.number().nullable().default(0),
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
