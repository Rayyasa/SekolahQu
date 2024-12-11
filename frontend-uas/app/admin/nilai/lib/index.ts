import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { NilaiCreatePayload, NilaiDetail, NilaiListFilter, NilaiResponse, NilaiUpdatePayload } from "../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import KelasPage from "../../kelas/page";

const useNilaiModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultParams: NilaiListFilter = {
    page: 1,
    pageSize: 10,
    keyword: "",
  }
  const { toastError, toastSuccess, toastWarning } = useToast();
  const getNilai = async (params: NilaiListFilter): Promise<NilaiResponse> => {
    return axiosAuthClient.get("/nilai/list", { params }).then((res) => res.data)
  }
  const useNilaiList = () => {
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
      ["/nilai/list", [filterParams]],
      () => getNilai(filterParams),
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
  const getDetailNilai = async (id: string): Promise<any> => {
    return axiosAuthClient.get(`/nilai/detail/${id}`).then((res) => res.data);
  }

  const useDetailNilai = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/nilai/detail", { id }],
      () => getDetailNilai(id),
      {
        select: (response) => response
      }
    );
    return { data, isFetching, isLoading }
  };
  const useUpdateNilai = (id: number) => {
    const { mutate, isLoading } = useMutation(
      (payload: NilaiUpdatePayload) => {
        return axiosAuthClient.put(`/nilai/update/${id}`, payload).then((res) => res.data);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/nilai/list"]);
        },
        onError: (e) => {
          console.log(e, 'error');
          toastError();
        }
      },
    );
    return { mutate, isLoading };
  }
  const useCreateNilai = () => {
    const { mutate, isLoading } = useMutation(
      (payload: NilaiCreatePayload) => {
        return axiosAuthClient.post('/nilai/create', payload)
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          router.push(`/admin/kelas`);
          queryClient.invalidateQueries(["/nilai/list"])
        },
        onError: (error: any) => {
          toastWarning(error.response.data.message)
        },
      }
    );
    return { mutate, isLoading }
  }
  const useDeleteNilai = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/nilai/delete/${id}`);
      },
      {
        onSuccess: (response, id) => {
          toastSuccess(response.data.message)
          queryClient.invalidateQueries([`/nilai/detail/${id}`,]);
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

  const getSiswa = async (): Promise<any> => {
    return axiosAuthClient.get("/siswa/list").then((res) => res.data);
  };

  const { data: optionsiswa, isFetching: isFetchingsiswa } = useQuery(
    ["/siswa/list/options"],
    () => getSiswa(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data siswa", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: `${item.nama_siswa}`,
            value: item.id_siswa,
          };
        });

        return options;
      },
    }
  );
  const getMapel = async (): Promise<any> => {
    return axiosAuthClient.get("/mapel/list").then((res) => res.data);
  };

  const { data: optionMapel, isFetching: isFetchingMapel } = useQuery(
    ["/mapel/list/options"],
    () => getMapel(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data mapel", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: `${item.nama_mapel} - ${item.guru.nama_guru} `,
            value: item.id_mapel,
          };
        });

        return options;
      },
    }
  );

  const getGuru = async (): Promise<any> => {
    return axiosAuthClient.get("/guru/list").then((res) => res.data);
  };

  const { data: optionGuru, isFetching: isFetchingGuru } = useQuery(
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

  return { useNilaiList, useCreateNilai, useDeleteNilai, optionsiswa, useDetailNilai, useUpdateNilai, optionMapel, optionGuru }

}

export default useNilaiModule;