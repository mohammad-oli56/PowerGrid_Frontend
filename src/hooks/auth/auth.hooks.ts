"use client";

import { getMe, googleaccount, loginUser, registeruser, verifyaccount } from "@/api/auth/auth.api";
import { getMes } from "@/api/profile.api";
import { useMutation, useQuery } from "@tanstack/react-query";


export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}


export function useRegister(){
  return useMutation({
    mutationFn:registeruser
  })
}



export function useVerify(){
  return useMutation({
    mutationFn:verifyaccount
  })
}

export function useGoogle(){
  return useMutation({
    mutationFn:googleaccount
  })
}

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}