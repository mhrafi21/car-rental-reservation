import { z } from 'zod'

const carValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'name must be string' }),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()),
    pricePerHour: z.number({
      invalid_type_error: 'price per hour must be number',
    }),
    isDeleted: z
      .boolean({ invalid_type_error: 'it should be boolean' })
      .default(false),
  }),
})

const updateCarValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name must be string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
      })
      .optional(),
    color: z
      .string({
        invalid_type_error: 'color must be string',
      })
      .optional(),
    isElectric: z
      .boolean({
        invalid_type_error: 'isElectric must be boolean',
      })
      .optional(),
    status: z
      .enum(['available', 'unavailable'])
      .default('available')
      .optional(),
    features: z
      .array(
        z.string({
          invalid_type_error: 'features must be array of string',
        }),
      )
      .optional(),
    pricePerHour: z
      .number({
        invalid_type_error: 'price per hour must be number',
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'it should be boolean',
      })
      .default(false)
      .optional(),
  }),
})

export const carValidation = {
  carValidationSchema,
  updateCarValidationSchema,
}
