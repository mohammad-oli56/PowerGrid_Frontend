"use client";

import { googleaccount, loginUser, registeruser, verifyaccount } from "@/api/auth/auth.api";
import { useMutation } from "@tanstack/react-query";


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
