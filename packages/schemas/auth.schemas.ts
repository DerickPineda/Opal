import { object, z } from 'zod';

export const SignUpSchema = z.object({
  email: z.email({ error: () => 'Email is required.' }),
  password: z
    .object({
      password: z.string(),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm'], // path of error
    }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.email({ error: () => 'Email is required.' }),
  password: z.string({ error: () => 'Password is required.' }),
});

export type SignInType = z.infer<typeof SignInSchema>;

// Phone Number, DOB, Name
export const OnboardingSchema = z.object({
  name: z.string({ error: () => 'Name is required.' }).min(1),
  phoneNumber: z
    .string({ error: () => 'Phone number is required.' })
    .min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.date({ error: () => 'Birthday is required. ' }),
});
