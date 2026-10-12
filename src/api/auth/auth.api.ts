
"use server";

import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export type LoginInput = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginInput) {
  try {
    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/auth/login",
      {
        email: data.email,
        password: data.password,
      }
    );

    if (!res.data.success) {
      throw new Error(
        res.data.message || "Invalid email or password"
      );
    }

    const accessToken = res.data.data.accessToken;

    const decodedToken = jwt.decode(
      accessToken
    ) as JwtPayload | null;

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    // Token-এর payload থেকে role নেওয়া
    const role = decodedToken.role;

    if (typeof role !== "string" || !role) {
      throw new Error("User role not found in token");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "User login successful",
      role,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    }

    throw error;
  }
}





export type registerinput = {
  name: string;
  email: string;
  password: string;
 
};

export async function registeruser(data: registerinput) {
  try {
    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/auth/register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
       
      }
    );

    if (!res.data.success) {
      throw new Error(
        res.data.message || "Registration failed"
      );
    }

    return {
      success: true,
      message: res.data.message || "User registered successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}

type VerifyUser = {
  email: string;
  otp: string | number;
};

export async function verifyaccount(data: VerifyUser) {
  try {
    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/auth/verify-email",
      {
        email: data.email,
        otp: data.otp,
      }
    );

    if (!res.data.success) {
      throw new Error(
        res.data.message || "Email verification failed"
      );
    }

    const accessToken = res.data.data?.accessToken;

    // Backend token না দিলে verification success return করবে
    if (!accessToken) {
      return {
        success: true,
        message:
          res.data.message || "Email verified successfully",
      };
    }

    const decodedToken = jwt.decode(
      accessToken
    ) as JwtPayload | null;

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    const role = decodedToken.role;

    if (typeof role !== "string" || !role) {
      throw new Error("User role not found in token");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message:
        res.data.message || "Email verified successfully",
      role,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Email verification failed",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}


