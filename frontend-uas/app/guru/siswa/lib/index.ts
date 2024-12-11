import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { SiswaCreatePayload, SiswaDetail, SiswaListFilter, SiswaResponse, SiswaUpdatePayload } from "../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import KelasPage from "../../kelas/page";

const useSiswaModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultParams: SiswaListFilter = {
    page: 1,
    pageSize: 10,
    keyword: "",
    alamat: "",
    jenis_kelamin: "",
    nama_siswa: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nisn: "",
  }
  const { toastError, toastSuccess, toastWarning } = useToast();
  const getSiswa = async (params: SiswaListFilter): Promise<SiswaResponse> => {
    return axiosAuthClient.get("/siswa/list", { params }).then((res) => res.data)
  }
  const useSiswaList = () => {
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
      ["/siswa/list", [filterParams]],
      () => getSiswa(filterParams),
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
  const getDetailSiswa = async (id: string): Promise<any> => {
    return axiosAuthClient.get(`/siswa/detail/${id}`).then((res) => res.data);
  }

  const useDetailSiswa = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/siswa/detail", { id }],
      () => getDetailSiswa(id),
      {
        select: (response) => response
      }
    );
    return { data, isFetching, isLoading }
  };
  const useUpdateSiswa = (id: number) => {
    const { mutate, isLoading } = useMutation(
      (payload: SiswaUpdatePayload) => {
        return axiosAuthClient.put(`/siswa/update/${id}`, payload).then((res) => res.data);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/siswa/list"]);
        },
        onError: (e: any) => {
          console.log(e, 'error');
          toastWarning(e.response.data.message)
        }
      },
    );
    return { mutate, isLoading };
  }
  const useCreateSiswa = () => {
    const { mutate, isLoading } = useMutation(
      (payload: SiswaCreatePayload) => {
        return axiosAuthClient.post('/siswa/create', payload)
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          router.push('/admin/siswa')
          queryClient.invalidateQueries(["/siswa/list"])
        },
        onError: (error: any) => {
          toastWarning(error.response.data.message)
        },
      }
    );
    return { mutate, isLoading }
  }
  const useDeleteSiswa = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/siswa/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          queryClient.invalidateQueries(["/siswa/list"]);
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

  const { data: optionKelas, isFetching } = useQuery(
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
  return { useSiswaList, useCreateSiswa, useDeleteSiswa, optionKelas, useDetailSiswa, useUpdateSiswa }

}

export default useSiswaModule;