'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from '@/app/components/ui/Form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { signUp, ActionResponse } from '@/app/actions/auth';

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
};

export default function SignUpPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    async (
      prevState: ActionResponse,
      formData: FormData
    ): Promise<ActionResponse> => {
      try {
        const result = await signUp(formData);

        if (result.success) {
          toast.success('Account created successfully');
          router.push('/dashboard');
        }

        return {
          success: result.success,
          message: result.message,
          errors:
            typeof result.errors === 'string'
              ? { general: [result.errors] }
              : result.errors,
        };
      } catch (error) {
        return {
          success: false,
          message: (error as Error).message || 'An error occurred',
          errors: undefined,
        };
      }
    },
    initialState
  );

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#121212]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Mode
        </h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1A1A1A] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-dark-border-subtle">
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
