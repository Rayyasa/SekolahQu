"use client";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import useProdukModule from "../../lib";
import { useRouter } from "next/navigation";
import { SiswaUpdatePayload, jenis_kelamin } from "../../interface";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import CurrencyInput from "@/components/CurrencyInput";
import useOption from "@/Hook/useOption";
import useSiswaModule from "../../lib";
import LoadingPage from "@/components/LoadingPage";
import Image from "next/image";

const createSiswaSchema = yup.object({
  nama_siswa: yup.string().nullable().default("").required("Wajib diisi!"),
  nisn: yup.string().nullable().default("").required("Wajib diisi!"),
  jenis_kelamin: yup.string().nullable().default("").required("Wajib diisi!"),
  tempat_lahir: yup.string().nullable().default("").required("Wajib diisi!"),
  tanggal_lahir: yup.string().nullable().default("").required("Wajib diisi!"),
  alamat: yup.string().nullable().default("").required("Wajib diisi!"),
  id_kelas: yup.number().nullable().default(null).required("Wajib diisi!"),
  photo: yup.string().nullable().default("").required("Wajib isi"),
});
const gender = [
  {
    value: jenis_kelamin.L,
    label: "Laki-Laki",
  },
  {
    value: jenis_kelamin.P,
    label: "Perempuan",
  },
];
const UpdateSiswa = ({ params }: { params: { id: string } }) => {
  const { useUpdateSiswa, useDetailSiswa, optionKelas } = useSiswaModule();
  const { mutate, isLoading } = useUpdateSiswa(+params.id);
  const { data, isFetching } = useDetailSiswa(params.id);
  const router = useRouter();
  const formik = useFormik<SiswaUpdatePayload>({
    initialValues: {
      id_siswa: data?.data.id_siswa || 0,
      id_kelas: data?.data.kelas.id_kelas || null,
      nisn: data?.data.nisn || "",
      nama_siswa: data?.data.nama_siswa || "",
      alamat: data?.data.alamat || "",
      jenis_kelamin: data?.data.jenis_kelamin || "",
      tanggal_lahir: data?.data.tanggal_lahir || "",
      tempat_lahir: data?.data.tempat_lahir || "",
      photo: data?.data.photo || "",
    },
    validationSchema: createSiswaSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "submit Berjalan");
      mutate(values, {
        onSuccess: () => {
          router.push("/admin/siswa");
          console.log("update selesai");
        },
      });
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (isFetching) {
    return LoadingPage;
  }
  console.log(data, "data");
  console.log(errors, "error");
  return (
    <section className="mx-5 py-10 flex flex-col gap-3">
      <div>
        <Link href={"/admin/siswa"}>
          {" "}
          <span className="flex items-center">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali{" "}
          </span>{" "}
        </Link>
      </div>
      <section className=" w-full bg-white rounded-lg shadow-md overflow-hidden p-10 border">
        <h2 className="text-xl font-bold text-gray-500">Update Siswa</h2>{" "}
        <FormikProvider value={formik}>
          {" "}
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <div className="">
              <Image
                src={values.photo || "/download.png"}
                width={200}
                height={200}
                alt="image.png"
                className="rounded-full"
              />
            </div>
            <section>
              <Label htmlFor="nama_siswa" title="nama siswa" />{" "}
              <InputText
                value={values.nama_siswa}
                placeholder="nama siswa"
                id="nama_siswa"
                name="nama_siswa"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.nama_siswa}
                messageError={errors.nama_siswa}
              />
            </section>
            <section>
              <Label htmlFor="nisn" title="NISN" />
              <InputText
                value={values.nisn}
                placeholder="NISN"
                id="nisn"
                name="nisn"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.nisn}
                messageError={errors.nisn}
              />
            </section>
            <section>
              <Label htmlFor="jenis_kelamin" title="Jenis Kelamin" />
              <Select
                value={values.jenis_kelamin || 0}
                id="jenis_kelamin"
                name="jenis_kelamin"
                onChange={handleChange}
                onBlur={handleBlur}
                options={gender}
                isError={!!errors.jenis_kelamin}
                messageError={errors.jenis_kelamin}
              />
            </section>
            <section>
              <Label htmlFor="tempat_lahir" title="Tempat Lahir" />
              <InputText
                value={values.tempat_lahir}
                placeholder="Tempat Lahir"
                id="tempat_lahir"
                name="tempat_lahir"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.tempat_lahir}
                messageError={errors.tempat_lahir}
              />
            </section>
            <section>
              <Label htmlFor="tanggal_lahir" title="Tanggal Lahir" />
              <InputText
                value={values.tanggal_lahir}
                placeholder="Tanggal Lahir"
                id="tanggal_lahir"
                name="tanggal_lahir"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.tanggal_lahir}
                messageError={errors.tanggal_lahir}
              />
            </section>
            <section>
              <Label htmlFor="alamat" title="alamat" />
              <InputText
                value={values.alamat}
                placeholder="alamat"
                id="alamat"
                name="alamat"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.alamat}
                messageError={errors.alamat}
              />
            </section>
            <section>
              <Label htmlFor="id_kelas" title="Nama Kelas" />
              <Select
                value={values.id_kelas || null || undefined}
                id="id_kelas"
                name="id_kelas"
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionKelas}
                isError={!!errors.id_kelas}
                messageError={errors.id_kelas}
              />
            </section>
            {/* <section className="w-full">
              <input type="file" id="photo" onChange={handleFileChange} />
            </section> */}

            <section>
              <Button
                type="submit"
                height="md"
                title="Perbarui"
                colorSchema="green"
                isLoading={isLoading}
                isDisabled={isLoading}
              />
              <Button
                height="md"
                title="Cancel"
                colorSchema="red"
                isLoading={isLoading}
                onClick={() => {
                  resetForm();
                }}
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default UpdateSiswa;
