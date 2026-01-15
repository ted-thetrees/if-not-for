import { authMiddleware } from '@descope/nextjs-sdk/server';

export default authMiddleware({
  projectId: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID!,
  redirectUrl: '/sign-in',
  // Public routes that don't require authentication
  publicRoutes: [
    '/',           // Home page
    '/sign-in',    // Sign-in page
  ],
});

export const config = {
  // Match all paths except static files and Next.js internals
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)'],
};
