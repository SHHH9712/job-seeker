"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SigninButton() {
  const { data: session } = useSession();
  return (
    <div className="">
      {session && session.user ? (
        <div className="flex flex-row">
          <p>Signed in as {session.user.email}</p>
          <button
            className="bg-slate-400 border-solid"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <button
            className="bg-slate-400 border-solid"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}
