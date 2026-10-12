
"use client";

import { useForm } from "@tanstack/react-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";
import { useVerify } from "@/hooks/auth/auth.hooks";

export function VerifyAccountCard() {
    const verify = useVerify()
 const searchParams = useSearchParams();
const email = searchParams.get("email") ?? "";

const form = useForm({
  defaultValues: {
    otp: "",
  },

  onSubmit: async ({ value }) => {
    if (!email) {
      console.error("Email not found in URL");
      return;
    }

    try {
      const payload = {
        email,
        otp: value.otp,
      };

      const result = await verify.mutateAsync(payload);

      console.log("Verification result:", result);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  },
});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field
        name="otp"
        validators={{
          onChange: ({ value }) =>
            value.length !== 6
              ? "Enter the complete 6-digit OTP"
              : undefined,
        }}
      >
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched &&
            !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="otp">
                Verification code
              </FieldLabel>

              <InputOTP
                id="otp"
                maxLength={6}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <FieldDescription>
                Enter the 6-digit code sent to your email.
              </FieldDescription>

              {isInvalid && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </Field>
          );
        }}
      </form.Field>

      <Button type="submit" className="w-full">
        Verify account
      </Button>
    </form>
  );
}
