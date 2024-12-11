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
import { UpdateGuruPayload, jenis_kelamin } from "../../interface";
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
import useGuruModule from "../../lib";
import Image from "next/image";

const createSiswaSchema = yup.object({
  nama_guru: yup.string().nullable().default("").required("Wajib diisi!"),
  nip: yup.string().nullable().default("").required("Wajib diisi!"),
  jenisKelamin: yup.string().nullable().default("").required("Wajib diisi!"),
  noTelp: yup.string().nullable().default("").required("Wajib diisi!"),
  alamat: yup.string().nullable().default("").required("Wajib diisi!"),
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
const UpdateGuru = ({ params }: { params: { id: string } }) => {
  const { useUpdateGuru, useDetailGuru } = useGuruModule();
  const { mutate, isLoading } = useUpdateGuru(+params.id);
  const { data, isFetching } = useDetailGuru(params.id);
  const router = useRouter();
  const formik = useFormik<UpdateGuruPayload>({
    initialValues: {
      id_guru: data?.data.id_guru || 0,
      nip: data?.data.nip || "",
      nama_guru: data?.data.nama_guru || "",
      alamat: data?.data.alamat || "",
      jenisKelamin: data?.data.jenisKelamin || "",
      noTelp: data?.data.noTelp || "",
      photo: data?.data.photo || "",
    },
    validationSchema: createSiswaSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "submit Berjalan");
      mutate(values, {
        onSuccess: () => {
          router.push("/admin/guru");
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
  // console.log(data, "data");
  // console.log(errors, "error");
  // console.log(values, "values");
  return (
    <section className="mx-5 py-10 flex flex-col gap-3">
      <div>
        <Link href={"/admin/guru"}>
          {" "}
          <span className="flex items-center">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali{" "}
          </span>{" "}
        </Link>
      </div>
      <section className=" w-full bg-white rounded-lg shadow-md overflow-hidden p-10 border">
        <h2 className="text-xl font-bold text-gray-500">Update Guru</h2>{" "}
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
              <Label htmlFor="nama_guru" title="nama guru" />{" "}
              <InputText
                value={values.nama_guru}
                placeholder="nama guru"
                id="nama_guru"
                name="nama_guru"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.nama_guru}
                messageError={errors.nama_guru}
              />
            </section>
            <section>
              <Label htmlFor="nip" title="NIP" />
              <InputText
                value={values.nip}
                placeholder="NIP"
                id="nip"
                name="nip"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.nip}
                messageError={errors.nip}
              />
            </section>
            <section>
              <Label htmlFor="jenisKelamin" title="Jenis Kelamin" />
              <Select
                value={values.jenisKelamin}
                id="jenisKelamin"
                name="jenisKelamin"
                onChange={handleChange}
                onBlur={handleBlur}
                options={gender}
                isError={!!errors.jenisKelamin}
                messageError={errors.jenisKelamin}
              />
            </section>
            <section>
              <Label htmlFor="noTelp" title="Nomor Telepon" />
              <InputText
                value={values.noTelp}
                placeholder="Nomor Telepon"
                id="noTelp"
                name="noTelp"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.noTelp}
                messageError={errors.noTelp}
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
            <input
              type="file"
              id="photo"
              onChange={(event: any) => {
                const file = event.target.files[0];

                // if (file.type !== "image/jpeg") {
                //   return alert("type tidak sesauai");
                // }

                let reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue("photo", reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue("file", file);

                console.log(file);
              }}
            />
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

export default UpdateGuru;
