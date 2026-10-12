
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";

import { useLogin } from "@/hooks/auth/auth.hooks";
import { toast } from "../ui/toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
 
    onSubmit: async ({ value }) => {
      try {
        const result = await login.mutateAsync(value);

        if (!result.success) {
          toast.add({
            type: "error",
            description: result.message || "Login failed",
          });
          return;
        }

        toast.add({
          type: "success",
          description: "Login successful!",
        });

        // switch (result.role) {
        //   case "ADMIN":
        //     router.push("/admin");
        //     break;

        //   case "POWER-OPWRATOR":
        //     router.push("/poweroperator");
        //     break;

        //   case "TECHNICIAN":
        //     router.push("/technician");
        //     break;

        //   case "COUSTOMER":
        //     router.push("/coustomer");
        //     break;

        //   default:
        //     toast.add({
        //       type: "error",
        //       description: `Unknown role: ${result.role}`,
        //     });
        // }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.";

        toast.add({
          type: "error",
          description: message,
        });
      }
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                    />

                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Button type="submit" disabled={login.isPending}>
            {login.isPending ? "Logging in..." : "Submit"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
