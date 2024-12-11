import { useToast } from "@/Hook";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { useSession } from "next-auth/react";
import { CreateGuruPayload, GuruDetail, GuruListFilter, GuruResponse, UpdateGuruPayload } from "../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/Hook/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { usePagination } from "@/Hook/usePagination";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import KelasPage from "../../kelas/page";
import useUploadFile from "@/Hook/useUploadFile";

const useGuruModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { uploadSingle } = useUploadFile();

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



  const updateGuru = async (id: number,
    payload: UpdateGuruPayload
  ): Promise<GuruResponse> => {
    if (!!payload.file === true) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);
      payload = {
        ...payload,
        photo: res.data.file_url,
      };
    }
    return axiosAuthClient
      .put(`/guru/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateGuru = (id: number) => {
    const { mutate, isLoading } = useMutation(
      (payload: UpdateGuruPayload) => updateGuru(id, payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
          queryClient.invalidateQueries([`/guru/detail/${id}`]);
          queryClient.invalidateQueries([`/guru/list`]);
        },
        onError: (e: any) => {
          console.log(e, 'error');
          if (e.response.status == 422) {
            return toastWarning(e.response.data.message);
          }

          if (e.response.status == 400) {
            console.log(e);
            return toastWarning(e.response.data.message.toString());
          }
          toastWarning(e.response.data.message)
        }
      },
    );
    return { mutate, isLoading };
  };


  const useCreateGuru = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: CreateGuruPayload) => {
        if (!!payload.file === true) {
          const res = await uploadSingle(payload.file);
          console.log("res", res);

          payload = {
            ...payload,
            photo: res.data.file_url
          };
        }

        return axiosAuthClient.post("/guru/create", payload).then((res) => res.data);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          router.push('/admin/guru')
          queryClient.invalidateQueries(["/guru/list"])
        },
        onError: (error: any) => {
          toastWarning(error.response.data.message)
        },
      }
    );
    return{mutate,isLoading}
  }

  const useDeleteGuru = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/guru/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          queryClient.invalidateQueries(["/guru/list"]);
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
  return { useGuruList, useDeleteGuru, useDetailGuru, useUpdateGuru, useCreateGuru }

}

export default useGuruModule;