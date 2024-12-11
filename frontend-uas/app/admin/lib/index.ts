import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { ProfileResponse, UserListFilter, UserListResponse } from "../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { ProfileUpdatePayload, RegisterPayload, RegisterResponse, UserRole } from "@/app/auth/interface";
import { KelasListFiler, KelasResponse } from "../kelas/interface";
import { SiswaResponse } from "../siswa/interface";
import { GuruResponse } from "../guru/interface";
import { mapelResponse } from "../mapel/interface";
import useValidation from "@/Hook/useValidation";
import useUploadFile from "@/Hook/useUploadFile";
const useAdminModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultParams: UserListFilter = {
    page: 1,
    pageSize: 10,
    role: "",
    nama: "",
    email: "",
    keyword: ""
  }
  const { toastError, toastSuccess, toastWarning } = useToast();
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
  const getMapel = async (): Promise<mapelResponse> => {
    return axiosAuthClient.get("/mapel/list").then((res) => res.data)
  }
  const useMapelList = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/mapel/list"],
      () => getMapel(),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );
    return {
      data,
      isLoading,
      isFetching,
    }
  };
  const getGuru = async (): Promise<GuruResponse> => {
    return axiosAuthClient.get("/guru/list",).then((res) => res.data)
  }
  const useGuruList = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/guru/list",],
      () => getGuru(),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );
    return {
      data,
      isLoading,
      isFetching,
    }
  };
  const getSiswa = async (): Promise<SiswaResponse> => {
    return axiosAuthClient.get("/siswa/list",).then((res) => res.data)
  }
  const useSiswaList = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/siswa/list"],
      () => getSiswa(),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );
    return {
      data,
      isLoading,
      isFetching,
    }
  };

  const getKelas = async (): Promise<KelasResponse> => {
    return axiosAuthClient.get("/kelas/list",).then((res) => res.data)
  }

  const useKelasList = () => {

    const { data, isLoading, isFetching } = useQuery(
      ["/kelas/list",],
      () => getKelas(),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );
    return {
      data,
      isLoading,
      isFetching,
    }
  };
  const getUser = async (): Promise<UserListResponse> => {
    return axiosAuthClient.get("/auth/list",).then((res) => res.data)
  }

  const useUser = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/auth/list",],
      () => getUser(),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );
    return {
      data,
      isLoading,
      isFetching,
    }

  };
  const getAllUser = async (params: UserListFilter): Promise<UserListResponse> => {
    return axiosAuthClient.get("/auth/list", { params }).then((res) => res.data)
  }

  const useUserList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams
    } = usePagination(defaultParams)
    const { data, isLoading, isFetching } = useQuery(
      ["/auth/list", [filterParams]],
      () => getAllUser(filterParams),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );
    return {
      data,
      isLoading,
      isFetching,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handleFilter,
      handleClear,
      filterParams
    }

  };
  const useDeleteUser = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/auth/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/auth/list"]);
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
  }; const updateProfile = async (
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
          router.push(`/admin/profile`)
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


  return { useUserList, useDeleteUser, useKelasList, useSiswaList, useGuruList, useMapelList, useRegister, useUser, useUpdateProfile }



}

export default useAdminModule;