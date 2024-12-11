import useAxiosAuth from "./useAuthAxios";
import { BaseResponseSuccess } from "@/Hook/lib/axiosClient";

interface FileResponse extends BaseResponseSuccess {
  data: {
    file_url: string;
    file_name: string;
    file_size: number;
  };
}
const useUploadFile = () => {
  const axiosAuthClient = useAxiosAuth();

  const uploadSingle = async (file: any): Promise<FileResponse> => {
    const form = new FormData();
    form.append("file", file);

    console.log(file);
    return axiosAuthClient
      .post("/upload/file", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  const uploadMultiple = async (files: File[]): Promise<FileResponse[]> => {
    const formDataArray = files.map((file) => {
      const form = new FormData();
      form.append("files", file);
      return form;
    });

    const uploadRequests = formDataArray.map((formData) =>
      axiosAuthClient.post("/upload/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );

    return Promise.all(uploadRequests).then((responses) =>
      responses.map((res) => res.data)
    );
  };

  const deleteFile = async (file_name: string) => {
    return axiosAuthClient.delete(`upload/file/delete/${file_name}`);
  };

  return { uploadSingle, deleteFile, uploadMultiple };
};

export default useUploadFile;
