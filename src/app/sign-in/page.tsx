'use client';

import { useState } from 'react';
import { useDescope, useSession } from '@descope/nextjs-sdk/client';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const sdk = useDescope();
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();

  // Redirect if already authenticated
  if (!isSessionLoading && isAuthenticated) {
    router.replace('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setStatus('loading');
    setErrorMessage('');

    const verifyUrl = `${window.location.origin}/verify`;
    
    const resp = await sdk.magicLink.signUpOrIn.email(email, verifyUrl);
    
    if (!resp.ok) {
      setStatus('error');
      setErrorMessage(resp.error?.errorMessage || 'Something went wrong. Please try again.');
    } else {
      setStatus('sent');
    }
  };

  if (isSessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {status === 'sent' ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Check your email
            </h1>
            <p className="text-gray-600 mb-6">
              We sent a magic link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Click the link in the email to sign in.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm text-blue-600 hover:text-blue-800"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Log in easily without a password!
              </h1>
              <p className="mt-2 text-gray-600">
                We'll send you an email with a magic link that'll log you in right away.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={status === 'loading'}
                required
              />

              {status === 'error' && (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !email.trim()}
                className="mt-6 w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'loading' ? 'Sending...' : 'Send magic link'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
