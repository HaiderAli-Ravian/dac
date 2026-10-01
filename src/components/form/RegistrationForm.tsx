'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldTitle, FieldError } from '@/components/ui/field';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone must contain only numbers'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Demo validation complete. No account was created.');
    reset();
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-sm text-slate-500">
        Demo only: use sample details. This form does not create an account or save credentials.
      </p>
      <Field data-invalid={!!errors.fullName}>
        <FieldTitle>Full Name</FieldTitle>
        <Input
          type="text"
          placeholder="John Doe"
          {...register('fullName')}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && <FieldError>{errors.fullName.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.email}>
        <FieldTitle>Email</FieldTitle>
        <Input
          type="email"
          placeholder="john@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.phone}>
        <FieldTitle>Phone Number</FieldTitle>
        <Input
          type="tel"
          placeholder="1234567890"
          {...register('phone')}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.password}>
        <FieldTitle>Password</FieldTitle>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••"
            {...register('password')}
            aria-invalid={!!errors.password}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <FieldError>{errors.password.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Validating Demo...
          </>
        ) : (
          'Validate Demo Form'
        )}
      </Button>
    </form>
  );
}
