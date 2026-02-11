"use client";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ActionState } from "@/lib/middleware";
import { signIn, signUp } from "./(login)/actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [signInState, signInFormAction, signInPending] = useActionState<
    ActionState,
    FormData
  >(signIn, { error: "" });
  const [signUpState, signUpFormAction, signUpPending] = useActionState<
    ActionState,
    FormData
  >(signUp, { error: "" });
  const pending = signInPending || signUpPending;
  const state = signInState.error ? signInState : signUpState;

  return (
    <form className="flex flex-col space-y-4">
      <div className="flex flex-col gap-3">
        <div>
          <Input
            id="username"
            name="username"
            aria-label="Username"
            type="text"
            autoCapitalize="off"
            autoComplete="username"
            spellCheck={false}
            required
            maxLength={50}
            className="relative block w-full appearance-none rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-accent1 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent1 sm:text-sm"
            placeholder="Username"
          />
        </div>

        <div>
          <Input
            id="password"
            name="password"
            aria-label="Password"
            type="password"
            required
            maxLength={100}
            className="relative block w-full appearance-none rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-accent1 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent1 sm:text-sm"
            placeholder="Password"
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg bg-accent1 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent1/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2"
          disabled={pending}
          formAction={signInFormAction}
        >
          {"Log in"}
        </Button>

        <Button
          type="submit"
          variant={"ghost"}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:text-accent1"
          disabled={pending}
          formAction={signUpFormAction}
        >
          {"Create account"}
        </Button>
      </div>
      {state?.error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</div>
      )}
    </form>
  );
}

export function SignInSignUp() {
  return (
    <Popover>
      <PopoverTrigger className="flex flex-row items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-accent1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Log in
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl border border-gray-100 px-6 py-5 shadow-xl">
        <span className="mb-3 block text-sm font-bold text-gray-900">Welcome back</span>
        <LoginForm />
      </PopoverContent>
    </Popover>
  );
}

import { signOut } from "./(login)/actions";

export function SignOut(props: { username: string }) {
  return (
    <Popover>
      <PopoverTrigger className="flex flex-row items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-accent1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        {props.username}
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col items-center rounded-xl border border-gray-100 px-4 py-3 shadow-xl">
        <form>
          <Button
            formAction={signOut}
            variant={"ghost"}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-red-600"
          >
            {"Sign Out"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
