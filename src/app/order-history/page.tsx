import { Metadata } from "next";
import { Suspense } from "react";
import { OrderHistoryDynamic } from "./dynamic";

export const metadata: Metadata = {
  title: "Order History",
};

export default async function Page() {
  return (
    <main className="min-h-screen bg-gray-50/50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-4 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Order History
        </h1>
        <div className="mt-6">
          <Suspense>
            <OrderHistoryDynamic />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
