"use client";

import { getMe, googleaccount, loginUser, registeruser, updateProfile, verifyaccount } from "@/api/auth/auth.api";

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}


export function useRegister() {
  return useMutation({
    mutationFn: registeruser
  })
}



export function useVerify() {
  return useMutation({
    mutationFn: verifyaccount
  })
}

export function useGoogle() {
  return useMutation({
    mutationFn: googleaccount
  })
}


export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 1,
  });
}



export function useUpdateprofile() {


  return useMutation({
    mutationFn: updateProfile,




  });
}

