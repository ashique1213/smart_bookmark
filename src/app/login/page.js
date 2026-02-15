"use client";

import { supabase } from "@/app/lib/supabase";

export default function Login() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center space-y-6">
        
        <h1 className="text-3xl font-bold text-gray-800">
          Smart Bookmark
        </h1>

        <p className="text-gray-500 text-sm">
          Save and manage your favorite links easily.
        </p>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg shadow-sm transition"
        >
        <div className="w-6 h-6 flex items-center justify-center font-bold text-lg text-blue-500">
          G
        </div>
          Login with Google
        </button>

      </div>
    </div>
  );
}
