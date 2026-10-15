"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarDays,
  Clock,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogIn,
  Copy,
  Fingerprint,
  Check,
} from "lucide-react";
import { useGetMe } from "@/hooks/auth/auth.hooks";

const MainProfile = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useGetMe();

  const user = data?.data;

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-40 rounded-3xl bg-slate-200 sm:h-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-36 rounded-2xl bg-slate-200" />
            <div className="h-36 rounded-2xl bg-slate-200" />
            <div className="h-36 rounded-2xl bg-slate-200" />
          </div>
          <div className="h-72 rounded-2xl bg-slate-200" />
        </div>
      </main>
    );
  }

  // Login / API error handling
  if (isError || !user) {
    const errorMessage = error instanceof Error ? error.message : "";
    const isUnauthorized = /401|403|unauthorized|unauthenticated|forbidden/i.test(
      errorMessage
    );

    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-lg shadow-slate-200/50 sm:p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            {isUnauthorized ? <LogIn size={30} /> : <AlertCircle size={30} />}
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {isUnauthorized ? "Login Required" : "Unable to Load Profile"}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {isUnauthorized
              ? "Please log in to access your profile and account information."
              : "Something went wrong while loading your profile. Please try again."}
          </p>
        </div>
      </main>
    );
  }

  const formatDate = (date?: string | null) => {
    if (!date) return "Not available";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }
    return new Intl.DateTimeFormat("en-BD", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(parsedDate);
  };

  const fullName = user.name || "User";
  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part: string) => part[0])
    .join("")
    .toUpperCase();

  const accountActive = user.isActive === true && user.status === "ACTIVE";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 sm:text-sm">
              My Account
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              My Profile
            </h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Manage your personal information and account details.
            </p>
          </div>

          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold sm:text-sm ${
              accountActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                accountActive ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {accountActive ? "Account Active" : "Account Inactive"}
          </div>
        </div>

        {/* Profile hero */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-32 overflow-hidden bg-gradient-to-r from-indigo-700 via-violet-600 to-purple-500 sm:h-44">
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[32px] border-white/10" />
            <div className="absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute left-4 top-4 flex items-center gap-2 text-white sm:left-6 sm:top-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur sm:h-10 sm:w-10">
                <ShieldCheck size={20} />
              </div>
              <span className="text-base font-bold tracking-wide sm:text-lg">
                My Account
              </span>
            </div>
          </div>

          <div className="px-4 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-indigo-100 to-violet-200 text-3xl font-bold text-indigo-700 shadow-md sm:h-28 sm:w-28 sm:text-4xl">
                  {user.profilePhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.profilePhoto}
                      alt={fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials || <UserRound size={36} />
                  )}
                </div>

                <div className="min-w-0 pb-1">
                  <h2 className="break-words text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                    {fullName}
                  </h2>

                  <p className="mt-0.5 break-all text-xs text-slate-500 sm:text-sm">
                    {user.email || "No email available"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                      <ShieldCheck size={13} />
                      {user.role || "USER"}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      <Fingerprint size={13} />
                      {user.provider || "ACCOUNT"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                {user.emailVerified ? (
                  <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700 sm:text-sm">
                    <CheckCircle2 size={16} />
                    Email Verified
                  </span>
                ) : (
                  <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 sm:text-sm">
                    <AlertCircle size={16} />
                    Email Not Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quick information cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icon={<Mail size={20} />}
            title="Email Address"
            value={user.email || "Not provided"}
            color="indigo"
            verified={user.emailVerified}
          />
          <InfoCard
            icon={<Phone size={20} />}
            title="Phone Number"
            value={user.phone || "Not provided"}
            color="emerald"
          />
          <InfoCard
            icon={<CreditCard size={20} />}
            title="Account Number"
            value={user.accountNumber || "Not available"}
            color="violet"
          />
        </section>

        {/* Personal information */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-11 sm:w-11">
                <UserRound size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  Personal Information
                </h3>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Your registered account information.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-x-8 px-5 py-2 sm:grid-cols-2 sm:px-8">
            <DetailRow label="Full Name" value={user.name} icon={<UserRound size={18} />} />
            <DetailRow label="Email Address" value={user.email} icon={<Mail size={18} />} />
            <DetailRow label="Phone Number" value={user.phone} icon={<Phone size={18} />} />
            <DetailRow label="Address" value={user.address} icon={<MapPin size={18} />} />
            <DetailRow label="Account Created" value={formatDate(user.createdAt)} icon={<CalendarDays size={18} />} />
            <DetailRow label="Last Updated" value={formatDate(user.updatedAt)} icon={<Clock size={18} />} />
            <DetailRow label="Account Status" value={user.status} icon={<CheckCircle2 size={18} />} />
            <DetailRow label="Login Provider" value={user.provider} icon={<Fingerprint size={18} />} />
            <DetailRow label="User ID" value={user.id} icon={<Fingerprint size={18} />} />
            <DetailRow label="Google ID" value={user.googleid || "Not connected"} icon={<UserRound size={18} />} />
            <DetailRow label="Deleted At" value={formatDate(user.deletedAt)} icon={<Clock size={18} />} />
            <DetailRow label="Account Active" value={user.isActive ? "Yes" : "No"} icon={<ShieldCheck size={18} />} />
          </div>
        </section>

        {/* Account security notice */}
        <section className="flex flex-col gap-4 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 sm:h-12 sm:w-12">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                Account Security
              </h3>
              <p className="mt-0.5 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                Keep your account information up to date and protect your login credentials.
              </p>
            </div>
          </div>
        </section>

        <p className="pb-4 text-center text-xs text-slate-400 break-all">
          Account ID: {user.id || "Unavailable"}
        </p>
      </div>
    </main>
  );
};

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "indigo" | "emerald" | "violet";
  verified?: boolean;
};

function InfoCard({ icon, title, value, color, verified }: InfoCardProps) {
  const [copied, setCopied] = useState(false);

  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
  };

  const handleCopy = async () => {
    if (!value || value === "Not provided" || value === "Not available" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Unable to copy:", err);
    }
  };

  const canCopy = value && value !== "Not provided" && value !== "Not available";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${colors[color]}`}>
          {icon}
        </div>

        {verified !== undefined && (
          <span className={verified ? "text-emerald-600" : "text-amber-600"}>
            {verified ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          </span>
        )}
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500 sm:text-sm">{title}</p>

      <div className="mt-1.5 flex items-center justify-between gap-2">
        <p className="min-w-0 break-all text-xs font-bold text-slate-900 sm:text-sm">
          {value}
        </p>

        {canCopy && (
          <button
            type="button"
            onClick={handleCopy}
            title={`Copy ${title}`}
            aria-label={`Copy ${title}`}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value?: string | null;
  icon: React.ReactNode;
};

function DetailRow({ label, value, icon }: DetailRowProps) {
  return (
    <div className="flex min-w-0 gap-3 border-b border-slate-100 py-4 last:border-b-0 sm:py-5">
      <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
          {label}
        </p>
        <p className="mt-1 break-words text-xs font-semibold text-slate-800 sm:text-sm">
          {value == null || value === "" ? "Not provided" : value}
        </p>
      </div>
    </div>
  );
}

export default MainProfile;