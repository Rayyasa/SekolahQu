"use client";
import React from "react";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { DeleteButton, AddButton } from "@/components/ButtonAction";
import clsx from "clsx";
import useOption from "@/Hook/useOption";
import useKonsumenModule from "../lib";
import { semester,NilaiCreatePayload } from "./interface";
import useNilaiModule from "./lib";
const TambahNilaiPage = () => {
  const opsiSemester = [
    {
      value: semester.GANJIL,
      label: "SATU",
    },
    {
      value: semester.GENAP,
      label: "DUA",
    },
    
  ];
  const createNilaiSchema = yup.object({
    semester: yup.string().nullable().default(semester.GANJIL).required("Wajib diisi!"),
    nilai_pengetahuan: yup.number().nullable().default(null).required("Wajib diisi!"),
    nilai_keterampilan: yup.number().nullable().default(null).required("Wajib diisi!"),
    id_siswa: yup.number().nullable().default(null).required("Wajib diisi!"),
    id_mapel: yup.number().nullable().default(null).required("Wajib diisi!"),
  });
  const { useCreateNilai, optionsiswa, optionMapel } = useNilaiModule();
  const { mutate, isLoading } = useCreateNilai();
  const formik = useFormik<NilaiCreatePayload>({
    initialValues: createNilaiSchema.getDefault(),
    validationSchema: createNilaiSchema,
    enableReinitialize: true,
    onSubmit: async (values: NilaiCreatePayload) => mutate(values),
  });
  const {
    values,
    setValues,
    resetForm,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;
  return (
    <section className="mx-5 py-10 flex flex-col gap-3">
      <section className="space-y-2 shadow-lg p-5">
        <Link href={"/admin/kelas"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">
          Input Nilai Siswa
        </h2>
        <FormikProvider value={formik}>
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="id_siswa" title="nama Siswa" />
              <Select
                value={values.id_siswa || 0}
                id="id_siswa"
                name="id_siswa"
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionsiswa}
                isError={!!errors.id_siswa}
                messageError={errors.id_siswa}
              />
            </section>
            <section>
              <Label htmlFor="id_mapel" title="nama Mata Pelajaran" />
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
              <Label htmlFor="semester" title="semester" />
              <Select
                value={values.semester}
                id="semester"
                name="semester"
                onChange={handleChange}
                onBlur={handleBlur}
                options={opsiSemester}
                isError={!!errors.semester}
                messageError={errors.semester}
              />
            </section>
            <section>
              <Label htmlFor="nilai_pengetahuan" title="Nilai Pengetahuan" />
              <InputText
                value={values.nilai_pengetahuan || null || undefined}
                placeholder="Nilai Pengetahuan"
                id="nilai_pengetahuan"
                name="nilai_pengetahuan"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.nilai_pengetahuan}
                messageError={errors.nilai_pengetahuan}
           
              />
            </section>
            <section>
              <Label htmlFor="nilai_keterampilan" title="Nilai Keterampilan" />
              <InputText
                value={values.nilai_keterampilan || null || undefined}
                placeholder="Nilai Keterampilan"
                id="nilai_keterampilan"
                name="nilai_keterampilan"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.nilai_keterampilan}
                messageError={errors.nilai_keterampilan}
           
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

export default TambahNilaiPage;
