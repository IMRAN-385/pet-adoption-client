import { createAuthClient } from "better-auth/react";

// ⚠️ IMPORTANT: VITE_API_URL এর শেষে /api দেবে না
// BetterAuth নিজেই /api/auth prefix handle করে
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
});

// Named exports — সরাসরি use করা যাবে
export const { signIn, signUp, signOut, useSession } = authClient;