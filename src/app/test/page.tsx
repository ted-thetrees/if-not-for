"use client";

import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Test Page
          </h1>
          <p className="text-gray-600 mb-6">
            This is a dummy page for testing the persistence of the footer audio
            player across page navigations.
          </p>
          <p className="text-gray-500 mb-8">
            Start playing audio on the home page, then navigate here. The audio
            should continue playing without interruption.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
