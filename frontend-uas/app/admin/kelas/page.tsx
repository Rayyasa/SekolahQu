"use client";
import React from "react";
import useKelasModule from "./lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import BgKelas from "@/assets/green-color-school-supplies-arranged-circular-shape-yellow-background.jpg";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import { Jurusan, KelasCreatePayload, NamaKelas } from "../kelas/interface";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import Filter from "./module/Filter";
import KelasCard from "@/components/KelasCard";
import Modal from "@/components/Modal";
import EmptyState from "@/components/NotFound";

const KelasPage = () => {
  const { useKelasList, useDeleteKelas } = useKelasModule();
  const { useCreateKelas } = useKelasModule();
  const { mutate: deleteMutate, isLoading: isLoadingDelete } = useDeleteKelas();
  const { mutate: createMutate, isLoading: isLoadingCreate } = useCreateKelas();
  const createKelasSchema = yup.object({
    nama_kelas: yup.string().nullable().default("").required("Wajib diisi!"),
    Jurusan: yup.string().nullable().default("").required("Wajib diisi!"),
  });
  const kelas = [
    {
      value: NamaKelas.X,
      label: "X",
    },
    {
      value: NamaKelas.XI,
      label: "XI",
    },
    {
      value: NamaKelas.XII,
      label: "XII",
    },
  ];
  const namaJurusan = [
    {
      value: Jurusan.TKJ,
      label: "TKJ",
    },
    {
      value: Jurusan.RPL,
      label: "RPL",
    },
  ];

  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useKelasList();
  const router = useRouter();
  console.log(data);
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      deleteMutate(id);
    },
  });
  const formik = useFormik<KelasCreatePayload>({
    initialValues: createKelasSchema.getDefault(),
    validationSchema: createKelasSchema,
    enableReinitialize: true,
    onSubmit: async (values: KelasCreatePayload) => createMutate(values),
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
  const { isOpen, onOpen, onClose } = useClosure();
  console.log(values);

  const handleDetail = (id: number) => {
    router.push(`/admin/kelas/${id}/detail`);
  };

  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <div className="flex flex-row px-4 gap-5">
        <div>
          <button
            className="btn btn-circle "
            onClick={() =>
              (document.getElementById("my_modal_1") as any)!.showModal()
            }
          >
            <PlusCircleIcon color="#16ab39" />
          </button>

          <Modal id="my_modal_1" title="Tambah Kelas">
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <section>
                    <Label htmlFor="nama_kelas" title="Nama Kelas" />
                    <Select
                      value={values.nama_kelas}
                      id="nama_kelas"
                      name="nama_kelas"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={kelas}
                      isError={!!errors.nama_kelas}
                      messageError={errors.nama_kelas}
                    />
                  </section>
                  <section>
                    <Label htmlFor="Jurusan" title="Jurusan" />
                    <Select
                      value={values.Jurusan}
                      id="Jurusan"
                      name="Jurusan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={namaJurusan}
                      isError={!!errors.Jurusan}
                      messageError={errors.Jurusan}
                    />
                  </section>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#16ab39] text-white hover:bg-white hover:text-gray-600 hover:outline disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isLoadingCreate}
                  >
                    {isLoadingCreate ? "Tunggu sebentar ya..." : "Simpan"}
                  </button>
                </div>
              </Form>
            </FormikProvider>
          </Modal>
        </div>
        <div>
          <button
            className="btn hover:bg-white hover:text-black bg-[#16ab39] text-white"
            onClick={onOpen} // Memanggil fungsi onOpen saat tombol diklik
          >
            {/* Tambahkan ikon atau teks untuk tombol */}
            Filter Kelas
          </button>
        </div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title="Filter Kelas"
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>
      </div>

      <section className="grid grid-cols-3 gap-4">
        {data?.data && data.data.length > 0 ? (
          data.data
            .sort((a, b) => a.nama_kelas.localeCompare(b.nama_kelas))
            .map((item, index) => (
              <KelasCard
                key={index}
                nama_kelas={item.nama_kelas}
                Jurusan={item.Jurusan}
                id_kelas={item.id_kelas || 0}
                onDetail={handleDetail}
                onDelete={handleDelete}
              />
            ))
        ) : (
          <EmptyState />
        )}
      </section>
      <Pagination
        page={params.page}
        pageSize={params.pageSize}
        handlePageSize={handlePageSize}
        handlePage={handlePage}
        pagination={data?.pagination}
      />
    </div>
  );
};

export default KelasPage;
