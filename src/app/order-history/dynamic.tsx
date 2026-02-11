import { getUser } from "@/lib/queries";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Image from "next/image";

type OrderItem = {
  slug: string;
  name: string;
  price: string;
  quantity: number;
  image_url: string | null;
};

export async function OrderHistoryDynamic() {
  const user = await getUser();
  if (!user) {
    return (
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
        Log in to view order history
      </p>
    );
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));

  if (userOrders.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-gray-200"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l4 2" />
        </svg>
        <p className="mt-2 text-sm text-gray-400">No previous orders.</p>
        <p className="text-xs text-gray-300">
          When you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {userOrders.map((order) => {
        const items: OrderItem[] = JSON.parse(order.items ?? "[]");
        return (
          <div
            key={order.id}
            className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-green-700">
                  {order.status}
                </span>
                <span className="text-xs text-gray-400">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                ${Number(order.total).toFixed(2)}
              </span>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Ship to: {order.shippingName} — {order.shippingAddress}
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm"
                >
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded object-contain"
                    />
                  )}
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Qty: {item.quantity} &middot; $
                      {Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
