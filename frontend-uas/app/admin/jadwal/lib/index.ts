import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { JadwalCreatePayload, JadwalListFilter, JadwalResponse, JadwalUpdatePayload, } from "../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import KelasPage from "../../kelas/page";

const useJadwalModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultParams: JadwalListFilter = {
    page: 1,
    pageSize: 10,
    keyword: "",
    dari_jam: "",
    sampai_jam: "",
    id_kelas: null,
    id_mapel: null
  }
  const { toastError, toastSuccess, toastWarning } = useToast();
  const getJadwal = async (params: JadwalListFilter): Promise<JadwalResponse> => {
    return axiosAuthClient.get("/jadwal/list", { params }).then((res) => res.data)
  }
  const useJadwalList = () => {
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
      ["/jadwal/list", [filterParams]],
      () => getJadwal(filterParams),
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
  const getDetailJadwal = async (id: string): Promise<any> => {
    return axiosAuthClient.get(`/jadwal/detail/${id}`).then((res) => res.data);
  }

  const useDetailJadwal = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/jadwal/detail", { id }],
      () => getDetailJadwal(id),
      {
        select: (response) => response
      }
    );
    return { data, isFetching, isLoading }
  };
  const useUpdateJadwal = (id: number) => {
    const { mutate, isLoading } = useMutation(
      (payload: JadwalUpdatePayload) => {
        return axiosAuthClient.put(`/jadwal/update/${id}`, payload).then((res) => res.data);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries([`/jadwal/detail/${id}`]);
          queryClient.invalidateQueries([`/jadwal/list`]);
        },
        onError: (e: any) => {
          console.log(e, 'error');
          toastWarning(e.response.data.message)
        }
      },
    );
    return { mutate, isLoading };
  }
  const useCreateJadwal = () => {
    const { mutate, isLoading } = useMutation(
      (payload: JadwalCreatePayload) => {
        return axiosAuthClient.post('/jadwal/create', payload)
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          router.push('/admin/jadwal')
          queryClient.invalidateQueries(["/jadwal/list"])
        },
        onError: (error: any) => {
          toastWarning(error.response.data.message)
        },
      }
    );
    return { mutate, isLoading }
  }
  const useDeleteJadwal = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/jadwal/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          queryClient.invalidateQueries(["/jadwal/list"]);
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

  const getKelas = async (): Promise<any> => {
    return axiosAuthClient.get("/kelas/list").then((res) => res.data);
  };

  const { data: optionKelas, isFetching: isFetchingKelas } = useQuery(
    ["/kelas/list/options"],
    () => getKelas(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data kelas", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: `${item.nama_kelas} - ${item.Jurusan}`,
            value: item.id_kelas,
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

  return { useJadwalList, useCreateJadwal, useDeleteJadwal, optionKelas, useDetailJadwal, useUpdateJadwal, optionMapel, optionGuru }

}

export default useJadwalModule;