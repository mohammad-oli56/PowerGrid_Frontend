import { VerifyAccountCard } from "@/components/From/verifyaccountcard";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Suspense } from "react";

const VerifyAccountPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/40 px-4 py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <ShieldCheck size={32} strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Verify your account
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            One more step to get started. Verify your account to continue
            securely.
          </p>
        </div>

        {/* Verification card */}
        <div className="rounded-2xl border bg-card p-5 shadow-lg shadow-black/5 sm:p-8">
          <Suspense fallback={<div>Loading verification form...</div>}>
            <VerifyAccountCard />
          </Suspense>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already verified?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-xs text-muted-foreground">
            Your account security matters to us.
          </p>
        </div>
      </div>
    </main>
  );
};

export default VerifyAccountPage;
