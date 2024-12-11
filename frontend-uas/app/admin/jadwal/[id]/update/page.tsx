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
import { JadwalUpdatePayload, Hari } from "../../interface";
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
import useMapelModule from "../../lib";
import useJadwalModule from "../../lib";

const createJadwalSchema = yup.object({
  hari: yup.string().nullable().default("").required("Wajib diisi!"),
  jam_mulai: yup.string().nullable().default("").required("Wajib diisi!"),
  jam_selesai: yup.string().nullable().default("").required("Wajib diisi!"),
  id_kelas: yup.number().nullable().default(null).required("Wajib diisi!"),
  id_mapel: yup.number().nullable().default(null).required("Wajib diisi!"),
});
const Jadwalhari = [
  {
    value: Hari.SENIN,
    label: "SENIN",
  },
  {
    value: Hari.SELASA,
    label: "SELASA",
  },
  {
    value: Hari.RABU,
    label: "RABU",
  },
  {
    value: Hari.KAMIS,
    label: "KAMIS",
  },
  {
    value: Hari.JUMAT,
    label: "JUMAT",
  },
  {
    value: Hari.SABTU,
    label: "SABTU",
  },
];
const UpdateMapel = ({ params }: { params: { id: string } }) => {
  const { useUpdateJadwal, useDetailJadwal, optionKelas, optionMapel } =
    useJadwalModule();
  const { mutate, isLoading } = useUpdateJadwal(+params.id);
  const { data, isFetching } = useDetailJadwal(params.id);
  const router = useRouter();
  const formik = useFormik<JadwalUpdatePayload>({
    initialValues: {
      id_jadwal: data?.data.id_jadwal || 0,
      jam_mulai: data?.data.jam_mulai || "",
      jam_selesai: data?.data.jam_mulai || "",
      hari: data?.data.hari || "",
      id_kelas: data?.data.kelas.id_kelas || 0,
      id_mapel: data?.data.mapel.id_mapel || 0,
    },
    validationSchema: createJadwalSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "submit Berjalan");
      mutate(values, {
        onSuccess: () => {
          router.push("/admin/jadwal");
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

  if (isFetching) {
    return LoadingPage;
  }
  console.log(data, "data");
  console.log(errors, "error");
  console.log(values, "values");
  return (
    <section className="mx-5 py-10 flex flex-col gap-3">
      <div>
        <Link href={"/admin/jadwal"}>
          {" "}
          <span className="flex items-center">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali{" "}
          </span>{" "}
        </Link>
      </div>
      <section className=" w-full bg-white rounded-lg shadow-md overflow-hidden p-10 border">
        <h2 className="text-xl font-bold text-gray-500">Update Mapel</h2>{" "}
        <FormikProvider value={formik}>
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="id_mapel" title="nama mata pelajaran" />
              <Select
                value={values.id_mapel || 0}
                id="id_mapel"
                name="id_mapel"
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionMapel}
                isError={!!errors.id_mapel}
                messageError={errors.id_mapel}
              />
            </section>
            <section>
              <Label htmlFor="id_kelas" title="Ruangan" />
              <Select
                value={values.id_kelas || 0}
                id="id_kelas"
                name="id_kelas"
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionKelas}
                isError={!!errors.id_kelas}
                messageError={errors.id_kelas}
              />
            </section>
            <section>
              <Label htmlFor="hari" title="Hari" />
              <Select
                value={values.hari}
                id="hari"
                name="hari"
                onChange={handleChange}
                onBlur={handleBlur}
                options={Jadwalhari}
                isError={!!errors.hari}
                messageError={errors.hari}
              />
            </section>
            <section>
              <Label htmlFor="jam_mulai" title="Jam mulai" />
              <InputText
                value={values.jam_mulai}
                placeholder="Jam Mulai Pelajaran"
                id="jam_mulai"
                name="jam_mulai"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.jam_mulai}
                messageError={errors.jam_mulai}
                type="time"
              />
            </section>
            <section>
              <Label htmlFor="jam_selesai" title="Jam selesai" />
              <InputText
                value={values.jam_selesai}
                placeholder="Jam Selesai Pelajaran"
                id="jam_selesai"
                name="jam_selesai"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.jam_selesai}
                messageError={errors.jam_selesai}
                type="time"
              />
            </section>
            <section className="flex flex-row gap-4">
              <Button
                className="py-3"
                type="submit"
                height="md"
                title="Simpan"
                colorSchema="green"
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default UpdateMapel;
