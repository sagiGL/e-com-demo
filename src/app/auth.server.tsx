import { getUser } from "@/lib/queries";
import { LoginForm, SignInSignUp, SignOut } from "./auth.client";
import { CheckoutForm } from "@/components/checkout-form";

export async function AuthServer() {
  const user = await getUser();
  // TODO: Could dynamic load the sign-in/sign-up and sign-out components as they're not used on initial render
  if (!user) {
    return <SignInSignUp />;
  }
  return <SignOut username={user.username} />;
}

export async function PlaceOrderAuth() {
  const user = await getUser();
  if (user) {
    return <CheckoutForm username={user.username} />;
  }
  return (
    <>
      <p className="text-sm font-semibold text-gray-900">Log in to place an order</p>
      <LoginForm />
    </>
  );
}
