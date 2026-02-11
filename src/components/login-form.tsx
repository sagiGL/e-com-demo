export function LoginForm() {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border border-gray-200 bg-gray-50/50 p-2.5 text-sm outline-none transition-colors focus:border-accent1 focus:bg-white"
        disabled
      />
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-gray-200 bg-gray-50/50 p-2.5 pr-16 text-sm outline-none transition-colors focus:border-accent1 focus:bg-white"
          disabled
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
          show
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-row items-center space-x-2">
          <input
            type="checkbox"
            id="stay-logged-in"
            className="rounded border-gray-300"
            disabled
          />
          <label htmlFor="stay-logged-in" className="text-xs text-gray-500">
            Stay logged in
          </label>
        </div>
        <div className="text-xs font-medium text-accent1">Reset Password</div>
      </div>
      <div className="w-full cursor-pointer rounded-lg bg-accent1 p-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent1/90 hover:shadow-md">
        Log in
      </div>
      <div className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-2.5 text-center text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:text-accent1">
        Create account
      </div>
    </div>
  );
}
