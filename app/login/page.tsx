"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Divider from "@/components/ui/Divider";
import SafeArea from "@/components/ui/SafeArea";
import Text from "@/components/ui/Text";
import { login } from "@/lib/api-client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("coby123");
  const [password, setPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await login(username.trim(), password);
      router.push("/feed");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeArea className="mx-auto max-w-md py-12">
      <Link href="/feed" className="inline-flex items-center">
        <Text variant="body" as="span" className="text-text-secondary">
          ← Back to feed
        </Text>
      </Link>

      <div className="mt-8">
        <Text variant="hero" as="h1" className="font-semibold">
          Dev Login
        </Text>
        <Text variant="body" className="mt-3 text-text-secondary">
          Sign in with the backend seed account to enable course search and detail requests.
        </Text>
      </div>

      <Divider className="mt-8" />

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="w-full rounded-md border border-divider-primary bg-surface-primary px-4 py-3 text-text-primary placeholder:text-text-secondary outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-md border border-divider-primary bg-surface-primary px-4 py-3 text-text-primary placeholder:text-text-secondary outline-none"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border border-divider-primary bg-surface-secondary px-4 py-3 text-left text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Text variant="body" as="span">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Text>
        </button>
      </form>
    </SafeArea>
  );
}
