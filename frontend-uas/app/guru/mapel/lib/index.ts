import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { MapelCreatePayload, MapelUpdatePayload, mapelListFilter, mapelResponse } from "../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import KelasPage from "../../kelas/page";

const useMapelModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultParams: mapelListFilter = {
    page: 1,
    pageSize: 10,
    keyword: "",
    nama_mapel: "",
  }
  const { toastError, toastSuccess, toastWarning } = useToast();
  const getMapel = async (params: mapelListFilter): Promise<mapelResponse> => {
    return axiosAuthClient.get("/mapel/list", { params }).then((res) => res.data)
  }
  const useMapelList = () => {
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
      ["/mapel/list", [filterParams]],
      () => getMapel(filterParams),
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
  const getDetailMapel = async (id: string): Promise<any> => {
    return axiosAuthClient.get(`/mapel/detail/${id}`).then((res) => res.data);
  }

  const useDetailMapel = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/mapel/detail", { id }],
      () => getDetailMapel(id),
      {
        select: (response) => response
      }
    );
    return { data, isFetching, isLoading }
  };
  const useUpdateMapel = (id: number) => {
    const { mutate, isLoading } = useMutation(
      (payload: MapelUpdatePayload) => {
        return axiosAuthClient.put(`/mapel/update/${id}`, payload).then((res) => res.data);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/mapel/list"]);
        },
        onError: (e: any) => {
          console.log(e, 'error');
          toastWarning(e.response.data.message)
        }
      },
    );
    return { mutate, isLoading };
  }
  const useCreateMapel = () => {
    const { mutate, isLoading } = useMutation(
      (payload: MapelCreatePayload) => {
        return axiosAuthClient.post('/mapel/create', payload)
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          router.push('/admin/mapel')
          queryClient.invalidateQueries(["/mapel/list"])
        },
        onError: (error: any) => {
          toastWarning(error.response.data.message)
        },
      }
    );
    return { mutate, isLoading }
  }
  const useDeleteMapel = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/mapel/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          queryClient.invalidateQueries(["/mapel/list"]);
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
  };

  const getGuru = async (): Promise<any> => {
    return axiosAuthClient.get("/guru/list").then((res) => res.data);
  };

  const { data: optionguru, isFetching } = useQuery(
    ["/guru/list/options"],
    () => getGuru(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data guru", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: `${item.nama_guru}`,
            value: item.id_guru,
          };
        });

        return options;
      },
    }
  );
  return { useMapelList, useCreateMapel, useDeleteMapel, optionguru, useDetailMapel, useUpdateMapel }

}

export default useMapelModule;