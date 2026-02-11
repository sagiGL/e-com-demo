"use client";

import { useActionState } from "react";
import { placeOrder } from "@/lib/actions";

export function CheckoutForm({ username }: { username: string }) {
  const [state, formAction, isPending] = useActionState(placeOrder, null);

  return (
    <form action={formAction} className="space-y-3">
      <p className="text-sm font-semibold text-gray-900">
        Shipping Details
      </p>
      <div>
        <label
          htmlFor="shippingName"
          className="mb-1 block text-xs font-medium text-gray-500"
        >
          Full Name
        </label>
        <input
          id="shippingName"
          name="shippingName"
          type="text"
          defaultValue={username}
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-accent1 focus:ring-1 focus:ring-accent1"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="shippingAddress"
          className="mb-1 block text-xs font-medium text-gray-500"
        >
          Address
        </label>
        <input
          id="shippingAddress"
          name="shippingAddress"
          type="text"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-accent1 focus:ring-1 focus:ring-accent1"
          placeholder="123 Main St, City, State 12345"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-xl bg-accent1 py-3 text-sm font-bold text-white transition-all hover:bg-accent1/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing…
          </span>
        ) : (
          "Place Order"
        )}
      </button>

      <p className="text-center text-[10px] text-gray-400">
        This is a demo — no real payment is processed.
      </p>
    </form>
  );
}
