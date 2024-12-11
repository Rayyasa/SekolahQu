"use client";
import React from "react";
import useKelasModule from "./lib";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import BgKelas from "@/assets/green-color-school-supplies-arranged-circular-shape-yellow-background.jpg";
import BgMapel from "@/assets/green-desk-with-stationery-top-view-copypace.jpg";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useMapelModule from "./lib";
import { MapelCreatePayload } from "./interface";
import InputText from "@/components/InputText";
import Filter from "./module/Filter";
import Modal from "@/components/Modal";
import EmptyState from "@/components/NotFound";
import MapelCard from "@/components/MapelCard";
// import Filter from "./module/Filter";

const  MapelPage = () => {
  const { useMapelList, useDeleteMapel, optionguru } = useMapelModule();
  const { useCreateMapel } = useMapelModule();
  const { mutate: deleteMutate, isLoading: isLoadingDelete } = useDeleteMapel();
  const { mutate: createMutate, isLoading: isLoadingCreate } = useCreateMapel();
  const createMapelSchema = yup.object({
    nama_mapel: yup.string().nullable().default("").required("Wajib diisi!"),
    id_guru: yup.number().nullable().default(null).required("Wajib diisi!"),
  });

  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useMapelList();
  const router = useRouter();
  console.log(data?.data.length);
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      deleteMutate(id);
    },
  });
  const formik = useFormik<MapelCreatePayload>({
    initialValues: createMapelSchema.getDefault(),
    validationSchema: createMapelSchema,
    enableReinitialize: true,
    onSubmit: async (values: MapelCreatePayload) => createMutate(values),
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
          <Modal id="my_modal_1" title="Tambah MataPelajaran">
            <FormikProvider value={formik}>
              <Form className="space-y-5" onSubmit={handleSubmit}>
                <section>
                  <Label htmlFor="nama_mapel" title="Nama MataPelajaran" />
                  <InputText
                    value={values.nama_mapel}
                    placeholder="Mata Pelajaran"
                    id="nama_mapel"
                    name="nama_mapel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.nama_mapel}
                    messageError={errors.nama_mapel}
                  />
                </section>
                <section>
                  <Label htmlFor="id_guru" title="Pengajar" />
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
                <section className="flex flex-row gap-4">
                  <Button
                    className="py-3"
                    type="submit"
                    height="md"
                    title="Simpan"
                    colorSchema="green"
                    isLoading={isLoadingCreate}
                    isDisabled={isLoadingCreate}
                  />
                </section>
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
            Filter MataPelajaran
          </button>
        </div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title="Filter Mapel"
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>
      </div>

      <section className="grid grid-cols-3 gap-4">
        {data?.data && data.data.length > 0 ? (
          data.data.map((item, index) => (
            <MapelCard
            key={index}
            id_mapel={item.id_mapel || 0}
            nama_mapel={item.nama_mapel}
            guru={item.guru}
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

export default MapelPage;
