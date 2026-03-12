"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Divider from "@/components/ui/Divider";
import SafeArea from "@/components/ui/SafeArea";
import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
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
    <main className="min-h-screen bg-surface-primary">
      <SafeArea className="mx-auto max-w-md py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
        >
          <Icon name="arrow-left" size={16} />
          <Text variant="body" as="span">
            Back
          </Text>
        </Link>

        <div className="mt-12 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center justify-center w-16 h-16 rounded-full"
              style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
            >
              <Icon name="flag" size={32} className="text-text-primary" />
            </span>
          </div>

          <Text variant="section" as="h1" className="font-semibold">
            Welcome Back
          </Text>
          <Text variant="body" className="mt-2 text-text-secondary">
            Sign in to continue to GreenBook
          </Text>
        </div>

        <Divider className="mt-8" />

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block mb-2"
              style={{
                fontFamily: "var(--sys-typography-family-sans)",
                fontSize: "14px",
                color: "var(--sys-color-text-secondary)",
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              className="w-full rounded-lg border border-divider-primary bg-surface-secondary px-4 py-3.5 text-text-primary placeholder:text-text-muted outline-none focus:border-text-secondary transition-colors"
              style={{ fontFamily: "var(--sys-typography-family-sans)" }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2"
              style={{
                fontFamily: "var(--sys-typography-family-sans)",
                fontSize: "14px",
                color: "var(--sys-color-text-secondary)",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-divider-primary bg-surface-secondary px-4 py-3.5 text-text-primary placeholder:text-text-muted outline-none focus:border-text-secondary transition-colors"
              style={{ fontFamily: "var(--sys-typography-family-sans)" }}
            />
          </div>

          {error ? (
            <div
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
              role="alert"
            >
              <Icon name="flag" size={16} className="text-red-600 shrink-0" />
              <Text variant="body" className="text-red-600">
                {error}
              </Text>
            </div>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Text variant="meta" className="text-text-muted">
            Demo credentials are pre-filled for testing
          </Text>
        </div>
      </SafeArea>
    </main>
  );
}
