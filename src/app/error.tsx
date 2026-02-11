"use client";

export default function Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="rounded-full bg-red-50 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      </div>
      <p className="mt-3 text-lg font-medium text-gray-700">Something went wrong</p>
      <p className="mt-1 text-sm text-gray-400">Please try again later.</p>
    </div>
  );
}
