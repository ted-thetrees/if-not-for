'use client';

import { useEffect, useState } from 'react';
import { useDescope } from '@descope/nextjs-sdk/client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Verify() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  
  const sdk = useDescope();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('t');
    
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token found. Please request a new magic link.');
      return;
    }

    const verifyToken = async () => {
      const resp = await sdk.magicLink.verify(token);
      
      if (!resp.ok) {
        setStatus('error');
        setErrorMessage(resp.error?.errorMessage || 'Verification failed. The link may have expired.');
      } else {
        setStatus('success');
        // Short delay to show success message, then redirect
        setTimeout(() => {
          router.replace('/');
        }, 1500);
      }
    };

    verifyToken();
  }, [sdk, searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {status === 'verifying' && (
          <>
            <div className="mb-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Verifying your magic link...
            </h1>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-4 text-4xl">✓</div>
            <h1 className="text-xl font-semibold text-gray-900">
              You're signed in!
            </h1>
            <p className="mt-2 text-gray-600">
              Redirecting you now...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-xl font-semibold text-gray-900 mb-4">
              Verification failed
            </h1>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => router.push('/sign-in')}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
