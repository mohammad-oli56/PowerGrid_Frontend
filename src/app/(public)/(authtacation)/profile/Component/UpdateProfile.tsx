"use client";

import React, { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetMe, useUpdateprofile } from "@/hooks/auth/auth.hooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


const profileSchema = z.object({

  phone: z
    .string()
    .regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  address: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UpdateProfile = () => {
  const profileUpdate = useUpdateprofile();
  const { data, isLoading, isError, error } = useGetMe();
  const router = useRouter()

  const user = data?.data;

  const form = useForm({
    defaultValues: {
     
      phone: "",
      address: "",
    } satisfies ProfileFormValues,

    validators: {
      onChange: profileSchema,
      onSubmit: profileSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        // Validate the complete form before submitting.
        // const validatedValues = profileSchema.parse(value);

        await profileUpdate.mutateAsync(value);

        toast.add({
          type: "success",
          description: "Profile updated successfully!",
        });

        router.push("/profile")
      } catch (err) {
        console.error("Failed to update profile:", err);

        toast.add({
          type: "error",
          description:
            err instanceof z.ZodError
              ? err.issues[0]?.message ?? "Please check your form."
              : err instanceof Error
                ? err.message
                : "Failed to update profile. Please try again.",
        });
      }
    },
  });

  // Populate the form after the profile has loaded.
  useEffect(() => {
    if (!user) return;

    
    form.setFieldValue("phone", user.phone ?? "");
    form.setFieldValue("address", user.address ?? "");
  }, [user, form]);

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-md bg-destructive/10 p-4 text-sm text-destructive"
      >
        Failed to load profile:{" "}
        {error instanceof Error
          ? error.message
          : "Something went wrong"}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-sm text-muted-foreground">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl space-y-6 rounded-xl border bg-card p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Update Profile
        </h2>

        <p className="text-sm text-muted-foreground">
          Manage your personal information and contact details below.
        </p>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup className="space-y-4">
        
          {/* Phone Field */}
          <form.Field name="phone">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Phone Number
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    inputMode="numeric"
                    placeholder="01700000000"
                    autoComplete="tel"
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    aria-describedby={
                      isInvalid ? `${field.name}-error` : undefined
                    }
                  />

                  {isInvalid && (
                    <p
                      id={`${field.name}-error`}
                      className="text-xs text-destructive"
                    >
                      {field.state.meta.errors
                        .map((item) =>
                          typeof item === "string"
                            ? item
                            : item?.message ?? "Invalid value"
                        )
                        .join(", ")}
                    </p>
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Address Field */}
          <form.Field name="address">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Address
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  onBlur={field.handleBlur}
                />
              </Field>
            )}
          </form.Field>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <form.Subscribe
              selector={(state) => [
                state.canSubmit,
                state.isSubmitting,
              ]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default UpdateProfile;