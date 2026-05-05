import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | If not for…",
  description: "Privacy policy for ifnotfor.com.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-transparent overflow-y-auto pb-32">
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Last updated: May 5, 2026
          </p>

          <section className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              This Privacy Policy describes how ifnotfor.com (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;the site&rdquo;) collects, uses, and
              handles information when you visit the site or interact with the
              &ldquo;If not for…&rdquo; podcast.
            </p>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Information we collect
              </h2>
              <p className="mb-3">
                We collect very little. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Email address</strong> — only if you send us a note
                  asking to subscribe or to be a guest. Your email is used to
                  send new episodes and to correspond with you directly.
                </li>
                <li>
                  <strong>Standard server and request logs</strong> — our
                  hosting provider (Vercel) and our audio host (Backblaze B2)
                  may record IP addresses, user-agent strings, and request
                  timestamps as part of normal operation and abuse prevention.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                How we use information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To send you episodes you&rsquo;ve asked to receive.</li>
                <li>To respond to messages you send us.</li>
                <li>To keep the site online and functioning.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                What we don&rsquo;t do
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We don&rsquo;t sell or rent your information.</li>
                <li>We don&rsquo;t run ads or insert ads into the podcast.</li>
                <li>
                  We don&rsquo;t use third-party advertising or marketing
                  trackers.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Cookies
              </h2>
              <p>
                The site does not set advertising or tracking cookies. Your
                browser may store small amounts of data (such as audio playback
                state) locally so the site works correctly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Third-party services
              </h2>
              <p className="mb-3">
                A few third parties help us run the site. Each has its own
                privacy practices:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Vercel</strong> — site hosting and content delivery.
                </li>
                <li>
                  <strong>Cloudflare</strong> — DNS and edge networking.
                </li>
                <li>
                  <strong>Backblaze B2</strong> — audio file storage and
                  delivery.
                </li>
                <li>
                  <strong>Resend</strong> — outbound email delivery for
                  subscriber messages.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Your choices
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You can unsubscribe at any time by replying to any email from
                  us, or by writing to{" "}
                  <a
                    href="mailto:ted@ifnotfor.com"
                    className="text-blue-600 hover:underline"
                  >
                    ted@ifnotfor.com
                  </a>
                  .
                </li>
                <li>
                  You can ask us to delete the email address and any
                  correspondence we have on file for you.
                </li>
                <li>
                  You can ask us what information we have associated with your
                  email address.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Children
              </h2>
              <p>
                The site is not directed at children under 13, and we do not
                knowingly collect information from them.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Changes to this policy
              </h2>
              <p>
                If we change this policy, we&rsquo;ll update the &ldquo;Last
                updated&rdquo; date at the top of this page. Material changes
                will be communicated to subscribers by email.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Contact
              </h2>
              <p>
                Questions about this policy? Write to{" "}
                <a
                  href="mailto:ted@ifnotfor.com"
                  className="text-blue-600 hover:underline"
                >
                  ted@ifnotfor.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
