'use client';

import formSchema from '@/auth/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AuthCredentials } from '@/app/types/shared';
import { useTranslations } from "next-intl";


interface AuthFormProps {
  onSubmit: (data: AuthCredentials) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps): JSX.Element {
  const t = useTranslations('auth');

  const formSchema = z.object({
    email: z
      .string({
        message: t('required'),
      })
      .email({
        message: t('invalid-email'),
      }),
    password: z
      .string({
        message: t('required'),
      })
      .min(1, {
        message: t('required'),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Card className="mt-2 p-2">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full max-w-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="max-w-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
}

export default AuthForm;
