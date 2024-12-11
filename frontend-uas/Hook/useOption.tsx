import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAuthAxios";
import { useSession } from "next-auth/react";
const useOptions = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const getKategori = async (): Promise<any> => {
    return axiosAuthClient.get("/kategori/list").then((res) => res.data);
  };

  const { data: optionKategori, isFetching } = useQuery(
    ["/kategori/list/options"],
    () => getKategori(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data kategori", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama_kategori,
            value: item.id,
          };
        });

        return options;
      },
    }
  );

  return { optionKategori };
};

export default useOptions;
