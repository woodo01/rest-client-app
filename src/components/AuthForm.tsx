'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Input } from './ui/input';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[@!*?$%&]/, {
      message: 'Password must include a special character',
    })
    .regex(/[a-z]/i, { message: 'Password must include at least one letter' }),
});

export function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   //submit logic here
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
