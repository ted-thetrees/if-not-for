'use client';

import { useSession, useUser, useDescope } from '@descope/nextjs-sdk/client';
import { useCallback } from 'react';

export function UserStatus() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user } = useUser();
  const sdk = useDescope();

  const handleLogout = useCallback(() => {
    sdk.logout();
  }, [sdk]);

  if (isSessionLoading) {
    return <span className="text-gray-500">Loading...</span>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700">
        Hello, {user?.name || user?.email || 'User'}
      </span>
      <button
        onClick={handleLogout}
        className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}
