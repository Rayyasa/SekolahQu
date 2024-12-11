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
import { MapelUpdatePayload } from "../../interface";
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

const createMapelSchema = yup.object({
  nama_mapel: yup.string().nullable().default("").required("Wajib diisi!"),
  id_guru: yup.number().nullable().default(null).required("Wajib diisi!"),
});
const UpdateMapel = ({ params }: { params: { id: string } }) => {
  const { useUpdateMapel, useDetailMapel, optionguru } = useMapelModule();
  const { mutate, isLoading } = useUpdateMapel(+params.id);
  const { data, isFetching } = useDetailMapel(params.id);
  const router = useRouter();
  const formik = useFormik<MapelUpdatePayload>({
    initialValues: {
      id_mapel: data?.data.id_mapel || 0,
      nama_mapel: data?.data.nama_mapel || "",
      id_guru: data?.data.guru.id_guru || 0,
    },
    validationSchema: createMapelSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "submit Berjalan");
      mutate(values, {
        onSuccess: () => {
          router.push("/admin/mapel");
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
        <Link href={"/admin/mapel"}>
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
          {" "}
          <Form className="space-y-5" onSubmit={handleSubmit}>
            {" "}
            <section>
              <Label htmlFor="nama_mapel" title="nama mata Pelajaran" />{" "}
              <InputText
                value={values.nama_mapel}
                placeholder="nama mata Pelajaran"
                id="nama_mapel"
                name="nama_mapel"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.nama_mapel}
                messageError={errors.nama_mapel}
              />
            </section>
            <section>
              <Label htmlFor="id_guru" title="Nama Pengajar" />
              <Select
                value={values.id_guru || 0}
                id="id_guru"
                name="id_guru"
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionguru}
                isError={!!errors.id_guru}
                messageError={errors.id_guru}
              />
            </section>
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

export default UpdateMapel;
