import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { ProfileResponse, ProfileUpdatePayload, UserRole } from "@/app/auth/interface";
import { KelasResponse } from "../kelas/interface";
import { SiswaResponse } from "../siswa/interface";
import { GuruResponse } from "../interface";
import { mapelResponse } from "../mapel/interface";
import { GuruListFilter } from "../interface";
import useUploadFile from "@/Hook/useUploadFile";
const useGuruModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {uploadSingle} = useUploadFile();

  const defaultParams: GuruListFilter = {
    page: 1,
    pageSize: 10,
    keyword: "",
    alamat: "",
    jenisKelamin: "",
    nama_guru: "",
    noTelp: "",
    nip: "",
  }
  const { toastError, toastSuccess, toastWarning } = useToast();
  const getDetailGuru = async (id: string): Promise<any> => {
    return axiosAuthClient.get(`/guru/detail/${id}`).then((res) => res.data);
  }

  const useDetailGuru = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/guru/detail", { id }],
      () => getDetailGuru(id),
      {
        select: (response) => response
      }
    );
    return { data, isFetching, isLoading }
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
  const getGuru = async (params: GuruListFilter): Promise<GuruResponse> => {
    return axiosAuthClient.get("/guru/list", { params }).then((res) => res.data)
  }
  const useGuruList = () => {
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
      ["/guru/list", [filterParams]],
      () => getGuru(filterParams),
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
          router.push(`/guru/profile`)
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




  return { useKelasList, useSiswaList, useGuruList, useMapelList, useDetailGuru ,useUpdateProfile}



}

export default useGuruModule;