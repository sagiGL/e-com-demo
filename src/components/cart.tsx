import { getCart } from "@/lib/cart";

export async function Cart() {
  const cart = await getCart();
  if (cart.length == 0) {
    return null;
  }
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
      {totalQuantity}
    </div>
  );
}
