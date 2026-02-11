"use client";
import { useActionState } from "react";
import { addToCart } from "@/lib/actions";

export function AddToCartForm({ productSlug }: { productSlug: string }) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <input type="hidden" name="productSlug" value={productSlug} />
      <button
        type="submit"
        className="inline-flex max-w-[180px] items-center justify-center gap-2 rounded-lg bg-accent1 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent1/90 hover:shadow-md active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        Add to cart
      </button>
      {isPending && <p className="text-sm text-gray-500">Adding to cart...</p>}
      {!isPending && message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
}
