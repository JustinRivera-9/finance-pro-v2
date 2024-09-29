import * as z from "zod";

export const CategorySchema = z
  .object({
    type: z.string(),
    category: z.string().min(1, {
      message: "Category cannot be empty",
    }),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a number greater than 0",
    }),
    isFixed: z.boolean(),
    date: z.union([
      z.string().min(1, {
        message: "Must select a date for fixed expense.",
      }),
      z.null(),
    ]),
  })
  .refine((data) => !data.isFixed || data.date, {
    message: "Fixed expenses must have a date",
    path: ["fixedDate"],
  });

export const ContactFormSchema = z.object({
  type: z.string(),
  message: z.string().min(1, {
    message: "Message cannot be empty",
  }),
});

export const PersonalInfoFormSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email(),
});

export const PasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Must enter your cuurrent password",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const AccountPreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  darkMode: z.boolean(),
});
