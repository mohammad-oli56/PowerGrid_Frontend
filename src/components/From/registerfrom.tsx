"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { FieldError } from "../ui/field";
import { useRegister } from "@/hooks/auth/auth.hooks";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const register = useRegister();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
     
    },
    onSubmit: async ({ value }) => {
      const result = await register.mutateAsync(value);

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message || "Login failed",
        });
        return;
      }

      if (result.success) {
        toast.add({
          type: "success",
          description: "OTP send ",
        });
        router.push(`/verifyaccount?email=${value.email}`);
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
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Name */}
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) =>
              !value.trim() ? "Full name is required" : undefined,
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) =>
                      typeof error === "string" ? { message: error } : error,
                    )}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) =>
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? "Enter a valid email address"
                : undefined,
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) =>
                      typeof error === "string" ? { message: error } : error,
                    )}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

      

        {/* Password */}
        <form.Field
          name="password"
          validators={{
            onBlur: ({ value }) =>
              value.length < 8
                ? "Password must be at least 8 characters"
                : undefined,
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  minLength={8}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) =>
                      typeof error === "string" ? { message: error } : error,
                    )}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* Submit */}
        <Field>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" className="w-full">
            Sign up with GitHub
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;
