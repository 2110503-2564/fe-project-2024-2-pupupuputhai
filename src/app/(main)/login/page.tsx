"use client";

import AuthForm from "@/components/auths/AuthForm";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        <AuthForm />
      </div>
    </div>
  );
}
