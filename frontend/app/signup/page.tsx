"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signupAction } from "@/actions/signup";

export default function SignupPage() {
  const [state, formAction] = useFormState(signupAction, null);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            type="username"
            className="w-full p-2 border rounded mt-1 text-black"
            required
          />
          {state?.error?.username && (
            <p className="text-red-500 text-xs mt-1">{state.error.username}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded mt-1 text-black"
            required
          />
          {state?.error?.email && (
            <p className="text-red-500 text-xs mt-1">{state.error.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full p-2 border rounded mt-1 text-black"
            required
          />
          {state?.error?.password && (
            <p className="text-red-500 text-xs mt-1">{state.error.password}</p>
          )}
        </div>

        <SubmitButton />

        {state?.success && (
          <p className="text-green-600 text-sm mt-2">{state.success}</p>
        )}
      </form>
    </div>
  );
}

// Sub-component to handle loading state via useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? "Creating Account..." : "Sign Up"}
    </button>
  );
}
