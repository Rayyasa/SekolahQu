import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { KelasCreatePayload, KelasListFiler, KelasResponse } from "../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const useKelasModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultParams: KelasListFiler = {
    page: 1,
    pageSize: 10,
    keyword: "",
  }
  const { toastError, toastSuccess, toastWarning } = useToast();


  const getKelas = async (params: KelasListFiler): Promise<KelasResponse> => {
    return axiosAuthClient.get("/kelas/list", { params }).then((res) => res.data)
  }

  const useKelasList = () => {
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
      ["/kelas/list", [filterParams]],
      () => getKelas(filterParams),
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
  const useCreateKelas = () => {
    const { mutate, isLoading } = useMutation(
      (payload: KelasCreatePayload) => {
        return axiosAuthClient.post('/kelas/create', payload)
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          router.push('/admin/kelas')
          queryClient.invalidateQueries(["/kelas/list"])
        },
        onError: (error: any) => {
          toastWarning(error.response.data.message)
        },
      }
    );
    return { mutate, isLoading }
  }
  const useDeleteKelas = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/kelas/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          queryClient.invalidateQueries(["/kelas/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message)
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading }
  }
  const getDetailKelas = async (id: string): Promise<any> => {
    return axiosAuthClient.get(`/kelas/detail/${id}`).then((res) => res.data);
  }

  const useDetailKelas = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/kelas/detail", { id }],
      () => getDetailKelas(id),
      {
        select: (response) => response
      }
    );
    return { data, isFetching, isLoading }
  };




  return { useKelasList, useCreateKelas, useDeleteKelas, useDetailKelas }



}

export default useKelasModule;