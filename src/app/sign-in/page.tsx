'use client';

import { Descope } from '@descope/nextjs-sdk';

export default function SignIn() {
    return (
          <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-md p-8">
                        <div className="mb-8 text-center">
                                  <h1 className="text-2xl font-semibold text-gray-900">Welcome to If not for…</h1>h1>
                                  <p className="mt-2 text-gray-600">Sign in to continue</p>p>
                        </div>div>
                        <Descope
                                    flowId="sign-up-or-in"
                                    redirectAfterSuccess="/"
                                    redirectAfterError="/sign-in"
                                    theme="light"
                                  />
                </div>div>
          </div>div>
        );
}
</div>
