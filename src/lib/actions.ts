"use server";

import { getCart, updateCart, detailedCart } from "./cart";
import { getSession } from "./session";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { redirect } from "next/navigation";

export async function addToCart(prevState: unknown, formData: FormData) {
  const prevCart = await getCart();
  const productSlug = formData.get("productSlug");
  if (typeof productSlug !== "string") {
    return;
  }
  const itemAlreadyExists = prevCart.find(
    (item) => item.productSlug === productSlug,
  );
  if (itemAlreadyExists) {
    const newQuantity = itemAlreadyExists.quantity + 1;
    const newCart = prevCart.map((item) => {
      if (item.productSlug === productSlug) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    await updateCart(newCart);
  } else {
    const newCart = [
      ...prevCart,
      {
        productSlug,
        quantity: 1,
      },
    ];
    await updateCart(newCart);
  }

  return "Item added to cart";
}

export async function removeFromCart(formData: FormData) {
  const prevCart = await getCart();
  const productSlug = formData.get("productSlug");
  if (typeof productSlug !== "string") {
    return;
  }
  const itemAlreadyExists = prevCart.find(
    (item) => item.productSlug === productSlug,
  );
  if (!itemAlreadyExists) {
    return;
  }
  const newCart = prevCart.filter((item) => item.productSlug !== productSlug);
  await updateCart(newCart);
}

export async function placeOrder(prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "You must be logged in to place an order." };
  }

  const cart = await detailedCart();
  if (cart.length === 0) {
    return { error: "Your cart is empty." };
  }

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * Number(item.price),
    0,
  );

  const shippingName = formData.get("shippingName") as string;
  const shippingAddress = formData.get("shippingAddress") as string;

  if (!shippingName?.trim() || !shippingAddress?.trim()) {
    return { error: "Please fill in shipping details." };
  }

  const itemsSummary = cart.map((item) => ({
    slug: item.slug,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image_url: item.image_url,
  }));

  await db.insert(orders).values({
    userId: session.user.id,
    total: total.toFixed(2),
    items: JSON.stringify(itemsSummary),
    shippingName: shippingName.trim(),
    shippingAddress: shippingAddress.trim(),
    status: "confirmed",
  });

  // Clear the cart
  await updateCart([]);

  redirect("/order-history");
}
