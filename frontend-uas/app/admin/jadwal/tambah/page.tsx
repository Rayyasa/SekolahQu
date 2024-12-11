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
import CurrencyInput from "../../../../components/CurrencyInput";
import clsx from "clsx";
import useOption from "@/Hook/useOption";
import useKonsumenModule from "../lib";
import { Hari, JadwalCreatePayload } from "../interface";
import useJadwalModule from "../lib";
const TambahJadwalPage = () => {
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
  const createJadwalSchema = yup.object({
    hari: yup.string().nullable().default("").required("Wajib diisi!"),
    jam_mulai: yup.string().nullable().default("").required("Wajib diisi!"),
    jam_selesai: yup.string().nullable().default("").required("Wajib diisi!"),
    id_kelas: yup.number().nullable().default(null).required("Wajib diisi!"),
    id_mapel: yup.number().nullable().default(null).required("Wajib diisi!"),
  });
  const { useCreateJadwal, optionKelas, optionMapel } = useJadwalModule();
  const { mutate, isLoading } = useCreateJadwal();
  const formik = useFormik<JadwalCreatePayload>({
    initialValues: createJadwalSchema.getDefault(),
    validationSchema: createJadwalSchema,
    enableReinitialize: true,
    onSubmit: async (values: JadwalCreatePayload) => mutate(values),
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
        <Link href={"/admin/jadwal"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        {JSON.stringify(values)}
        <h2 className="text-xl font-bold text-gray-500">
          Tambah Jadwal Mata Pelajaran
        </h2>
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

export default TambahJadwalPage;
