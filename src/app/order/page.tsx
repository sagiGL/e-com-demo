import { Metadata } from "next";
import { Suspense } from "react";
import { CartItems, TotalCost } from "./dynamic";
import { PlaceOrderAuth } from "../auth.server";

export const metadata: Metadata = {
  title: "Order",
};

export default async function Page() {
  return (
    <main className="min-h-screen bg-gray-50/50 sm:p-6">
      <div className="container mx-auto max-w-6xl rounded-2xl bg-white p-4 shadow-sm sm:p-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        </div>

        <div className="flex grid-cols-3 flex-col gap-8 pt-6 lg:grid">
          <div className="col-span-2">
            <Suspense>
              <CartItems />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-lg font-bold text-gray-900">
                Order Summary
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                <span className="text-sm text-gray-500">Merchandise</span>
                <span className="font-semibold">
                  <Suspense>
                    <TotalCost />
                  </Suspense>
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Applicable shipping and tax will be added at checkout.
              </p>
            </div>
            <Suspense>
              <PlaceOrderAuth />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
