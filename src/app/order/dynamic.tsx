import { cache } from "react";
import { detailedCart } from "@/lib/cart";
import { Link } from "@/components/ui/link";
import Image from "next/image";
import { removeFromCart } from "@/lib/actions";
import { X } from "lucide-react";

const getCartItems = cache(() => detailedCart());
type CartItem = Awaited<ReturnType<typeof getCartItems>>[number];

export async function CartItems() {
  const cart = await getCartItems();
  return (
    <>
      {cart.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent1"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
          <div>
            <p className="text-sm font-semibold text-accent1">Delivers in 2-4 weeks</p>
            <p className="text-xs text-gray-500">Free shipping on orders over $50</p>
          </div>
        </div>
      )}
      {cart.length > 0 ? (
        <div className="flex flex-col divide-y divide-gray-100">
          {cart.map((item) => (
            <CartItem key={item.slug} product={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <p className="mt-3 text-sm text-gray-400">Your cart is empty</p>
        </div>
      )}
    </>
  );
}
function CartItem({ product }: { product: CartItem }) {
  if (!product) {
    return null;
  }
  // limit to 2 decimal places
  const cost = (Number(product.price) * product.quantity).toFixed(2);
  return (
    <div className="flex flex-row items-center justify-between py-4">
      <Link
        prefetch={true}
        href={`/products/${product.subcategory.subcollection.category_slug}/${product.subcategory.slug}/${product.slug}`}
      >
        <div className="flex flex-row items-center space-x-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2">
            <Image
              loading="eager"
              decoding="sync"
              src={product.image_url ?? "/placeholder.svg"}
              alt="Product"
              width={256}
              height={256}
              quality={80}
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="max-w-[100px] flex-grow sm:max-w-full">
            <h2 className="text-sm font-semibold text-gray-900">{product.name}</h2>
            <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 md:text-sm">{product.description}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-4">
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">Qty: {product.quantity}</span>
          <div className="hidden text-sm text-gray-500 md:block">
            ${Number(product.price).toFixed(2)} each
          </div>
          <div className="min-w-20 text-right">
            <p className="font-bold text-gray-900">${cost}</p>
          </div>
        </div>
        <form action={removeFromCart}>
          <button type="submit" className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
            <input type="hidden" name="productSlug" value={product.slug} />
            <X className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export async function TotalCost() {
  const cart = await getCartItems();

  const totalCost = cart.reduce(
    (acc, item) => acc + item.quantity * Number(item.price),
    0,
  );

  return <span> ${totalCost.toFixed(2)}</span>;
}
