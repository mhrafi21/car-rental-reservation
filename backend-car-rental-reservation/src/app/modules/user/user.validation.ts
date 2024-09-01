import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
    }),
    email: z.string({
      invalid_type_error: 'Email must be string',
    }),
    password: z.string({
      invalid_type_error: 'Password must be string',
    }),
   confirmPassword: z.string({
    invalid_type_error: "password must be string"
   }),
    terms: z.boolean(),
    role: z.enum(['user', 'admin']).optional(),
  }),
})

export const userValidation = {
  userValidationSchema,
}
