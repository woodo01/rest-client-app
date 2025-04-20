import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[@!*?$%&]/, {
      message: 'Password must include a special character',
    })
    .regex(/\p{L}/u, { message: 'Password must include at least one letter' }),
});

export default formSchema;
