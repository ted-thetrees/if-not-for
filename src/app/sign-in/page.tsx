'use client';

import { Descope } from '@descope/nextjs-sdk';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to If not for…</h1>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>
        <Descope
          flowId="sign-up-or-in"
          onSuccess={() => router.push('/')}
          onError={(e: CustomEvent) => console.error('Authentication error:', e)}
          theme="light"
        />
      </div>
    </div>
  );
}
