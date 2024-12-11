'use client';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/Hook";
import {
  ForgotPassPayload,
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  ProfileUpdatePayload,
  RegisterPayload,
  RegisterResponse,
  ResetPassswordResponse,
  ResetPasswordPayload,
  forgotPassResponse,
} from "../interface/";
import { BaseResponseSuccess, axiosClient } from "@/Hook/lib/axiosClient";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useValidation from "@/Hook/useValidation";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { error } from "console";
import useUploadFile from "@/Hook/useUploadFile";

const useAuthModule = () => {
  const { toastError, toastSuccess, toastWarning } = useToast();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { uploadSingle } = useUploadFile();

  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post("/auth/register", payload).then((res) => res.data);
  };

  const useRegister = () => {
    const { setErrorValidation, handleTyping, handleShowError } = useValidation();
    const { mutate, isLoading, isError, error } = useMutation(
      (payload: RegisterPayload) => register(payload),
      {
        onMutate: () => {
          setErrorValidation([]);
        },
        onSuccess: (response) => {
          toastSuccess(response.message);
          router.push("/auth/login");
        },
        onError: (error: any) => {
          if (error.response.status) {
            return toastWarning(error.response.data.message)
          }
          if (error.response.status == 422) {
            setErrorValidation(error.response.data.errors);
            return toastWarning(error.response.data.message);
          }
          toastError();
        },
      }
    );
    return { mutate, isLoading, isError, error, handleShowError, handleTyping };
  };


  const forgotPass = async (payload: ForgotPassPayload): Promise<forgotPassResponse> => {
    return axiosClient.post("/auth/lupa-password", payload).then((res) => res.data)
  }

  const useForgotPass = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ForgotPassPayload) => forgotPass(payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading }
  }

  const resetPassword = async (payload: ResetPasswordPayload, id: number, token: string): Promise<BaseResponseSuccess> => {
    return axiosClient.post(`/auth/reset-password/${id}/${token}`, payload).then((res) => res.data)
  };

  const useResetPassword = (id: string, token: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: ResetPasswordPayload) => resetPassword(payload, +id, token),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push('/auth/login');
        },
        onError: (error: any) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        }
      }
    );
    return { mutate, isLoading }
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response) => {
          toastSuccess(response.message);
          await signIn("credentials", {
            id: response.data.id,
            nama: response.data.nama,
            email: response.data.email,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            role: response.data.role,
            redirect: false,
          })
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };


  //Jika ada API yg ada request token maka pakai yang axiosAuthClient 
  const getProfile = async (): Promise<ProfileResponse> => {
    return axiosAuthClient.get("/auth/profile").then((res) => res.data);
  }; const useProfile = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/auth/profile"],
      () => getProfile(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );

    return { data, isFetching, isLoading };
  };
  const updateProfile = async (
    payload: ProfileUpdatePayload
  ): Promise<ProfileResponse> => {
    if (!!payload.file === true) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        avatar: res.data.file_url,
      };
    }

    return axiosAuthClient
      .put("/profile/update", payload)
      .then((res) => res.data);
  };

  const useUpdateProfile = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProfileUpdatePayload) => updateProfile(payload),
      {
        onSuccess: async (response) => {
          toastSuccess(response.message);
          queryClient.invalidateQueries(["/auth/profile"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            return toastWarning(error.response.data.message);
          }

          if (error.response.status == 400) {
            return toastWarning(error.response.data.message.toString());
          }

          toastError();
        },
      }
    );

    return { mutate, isLoading };
  };

  return { useRegister, useLogin, useProfile, useForgotPass, useResetPassword, useUpdateProfile };
};

export default useAuthModule;